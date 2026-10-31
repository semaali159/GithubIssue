import type { Issue, IssueComment, IssueFilter } from "../types";

const REPO = "react/react"
const BASE_URL= "https://api.github.com"

interface GithubIssue{
    id:number;
    number:number;
    title:string;
    body:string | null ;
    state: "open" | "closed";
    user: { login: string; avatar_url: string } | null;
    labels: { id: number; name: string; color: string; description: string | null }[];
    comments: number;
    created_at: string;
    updated_at: string;
}

interface GithubSearchResponse{
    total_count:number;
    items:GithubIssue[]
}

interface FetchIssuesParams {
  search: string;
  filter: IssueFilter;
  page: number;
  perPage: number;
  signal?: AbortSignal;
}

interface GithubComment {
  id: number;
  body: string;
  user: { login: string; avatar_url: string } | null;
  created_at: string;
}

function mapIssue(raw:GithubIssue):Issue{
    return{
        id:raw.id,
        number:raw.number,
        title:raw.title,
        body: raw.body ?? "",
        state:raw.state,
        author: {
            login: raw.user?.login ?? "ghost",
            avatarUrl: raw.user?.avatar_url ?? "",
        },
        labels: raw.labels.map((label)=>({
            id:label.id,
            name:label.name,
            color:label.color,
            description: label.description ?? undefined
        })),
        commentsCount:raw.comments,
        createdAt: raw.created_at,
        updatedAt:raw.updated_at

    }
}
async function searchIssue(
    query: string,
    page:number,
    perPage: number,
    signal?: AbortSignal 
):Promise<GithubSearchResponse>{
    const params = new URLSearchParams({
  q: query,
  page: String(page),
  per_page: String(perPage),
  sort: "created",
  order: "desc",
});
    const res = await fetch(`${BASE_URL}/search/issues?${params}`,{
        signal,
        headers: { Accept: "application/vnd.github+json" },
    })
    if(!res.ok){
        if(res.status === 403 || res.status === 429 ){
            throw new Error("GitHub rate limit reached. Try again later")
        }

  const body = await res.json().catch(() => null);
  throw new Error(body?.message ?? `Request failed (${res.status})`);
    }
    return res.json()
}
async function githubRequest<T>(url:string, signal?: AbortSignal):Promise<T> {
    const res = await fetch(url,{
        signal,
        headers:{Accept: "application/vnd.github+json"}
    })
    if(!res.ok){
        if(res.status === 404) throw new Error("Issue not found")
        if(res.status===403 || res.status === 429) {
            throw new Error("GitHub rate limit reached. Try again later")
        }     
    }
    return res.json()
    
}
export async function fetchIssues({search,filter,page,perPage,signal}:FetchIssuesParams) {
    const parts = [`repo:${REPO}`, "is:issue"];
    if(filter !== "all") parts.push(`is:${filter}`)
    if(search.trim()) parts.push(`${search.trim()} in:title,body`)
    const data = await searchIssue(parts.join(" "), page,perPage,signal)

    return{
        issues: data.items.map(mapIssue),
        totalCount: data.total_count
    }
            
}
export async function fetchIssueCounts() {
    const [open,closed] = await Promise.all([
        searchIssue(`repo:${REPO} is:issue is:open`,1,1),
        searchIssue(`repo:${REPO} is:issue is:closed`,1,1)
    ])
    return {open:open.total_count, closed:closed.total_count}
    
}
export async function fetchIssueById(number:number, signal?:AbortSignal) {
    const raw = await githubRequest<GithubIssue>(
        `${BASE_URL}/repos/${REPO}/issues/${number}`,
        signal
    )
    return mapIssue(raw)
    
}
export async function fetchIssueComments(number:number,signal?: AbortSignal):Promise<IssueComment[]> {
    const raw  = await githubRequest<GithubComment[]>(
        `${BASE_URL}/repos/${REPO}/issues/${number}/comments?per_page=30`,
        signal
    )
    return raw.map((c)=>({
        id:c.id,
        body:c.body,
        user:{
            login:c.user.login ?? "ghost",
            avatarUrl:c.user?.avatar_url ?? ""
        },
        createdAt:c.created_at
    }))
    
}
