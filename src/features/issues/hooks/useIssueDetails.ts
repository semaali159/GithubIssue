import { useEffect, useState } from "react";
import type { Issue, IssueComment } from "../types";
import { fetchIssueById, fetchIssueComments } from "../api/issuesApi";

export function useIssueDetails(number:number){
    const [issue, setIssue] = useState<Issue| null>(null)
    const [comments,setComments] = useState<IssueComment[]>([])
    const [isLoading, setIsLoading]= useState(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(()=> {
        if(!Number.isInteger(number) || number <= 0){
            setError("Invalid issue number.")
            setIsLoading(false)
            return
        }
        const controller = new AbortController()
        setIsLoading(true)
        setError(null)

        Promise.all([
            fetchIssueById(number,controller.signal),
            fetchIssueComments(number,controller.signal)
        ]).then(([issueData, commentsData])=>{
            setIssue(issueData);
            setComments(commentsData)
        })
        .catch((err:Error)=>{
            if(err.name === "AbortError") return
            setError(err.message)
        })
        .finally(()=>{
            if(!controller.signal.aborted) setIsLoading(false)
        })
    return ()=> controller.abort()
    },[number])
    
    return{issue,comments,isLoading,error}
}