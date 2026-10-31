import { useEffect, useState } from "react"
import type { IssueFilter, Issue } from "../features/issues/types"
// import type { Issue } from "../types"
import { useDebounce } from "./useDebounce"
import { fetchIssueCounts, fetchIssues } from "../features/issues/api/issuesApi"

const PAGE_SIZE = 6 
const GITHUB_SEARCH_LIMIT = 1000;
const MAX_PAGES = Math.floor(GITHUB_SEARCH_LIMIT / PAGE_SIZE);
export function useIssues(){
    const [search, setSearch] = useState("")
    const [filter, setFilter]= useState<IssueFilter>("open")
    const [page, setPage] = useState(1)
    const [issues, setIssues] = useState<Issue[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [counts, setCounts] = useState({open:0, closed:0})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string| null>(null)
    const debouncedSearch = useDebounce(search)
    useEffect(()=>{
        fetchIssueCounts()
            .then(setCounts)
            .catch(()=>{

            })
    },[])
    useEffect(()=>{
        const controller = new AbortController()

        setIsLoading(true)
        setError(null)
        fetchIssues({
            search:debouncedSearch,
            filter,
            page,
            perPage:PAGE_SIZE,
            signal:controller.signal
        })
            .then((res)=>{
                setIssues(res.issues)
                setTotalCount(res.totalCount)
            })
            .catch((err:Error)=>{
                if(err.name === "AbortError") return
                setError(err.message)
                setIssues([])
                setTotalCount(0)
            })
            .finally(()=>{
                if(!controller.signal.aborted) setIsLoading(false)
            })
        return ()=> controller.abort()
    },[debouncedSearch,filter,page])

    return {
        search,
        filter,
        counts,
        issues,
        totalCount,
        isLoading,
        error,
        page,
        pageSize:PAGE_SIZE,
        totalPages: Math.min(MAX_PAGES, Math.max(1, Math.ceil(totalCount / PAGE_SIZE))),
        setPage,
        setSearch:(v:string)=>{
            setSearch(v);
            setPage(1);
        },
        setFilter:(v:IssueFilter)=>{
            setFilter(v);
            setPage(1)
        },
        reset:()=>{
            setSearch("");
            setFilter("open");
            setPage(1)
        },
        isTruncated: totalCount > GITHUB_SEARCH_LIMIT,
    }
}
