import type { Issue } from '../types'
import IssueCard from './IssueCard'

interface IssueListProps{
    issues: Issue[];
    isLoading:boolean;
    error:string | null;
}
const IssueList = ({issues, isLoading, error}:IssueListProps) => {
    if(isLoading){
        return (
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                {
                    Array.from({length:6}, (_,index)=>(
                        <div
                            key={index}
                            className='h-40 animate-pulse rounded-2xl border border-slate-200 bg-white'
                        />
                    ))
                }
            </div>
        )
    }
    if(error){
        return(
            <div 
                role='alert'
                className='rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-700'
            >
                {error}
            </div>
        )
    }
    if(issues.length === 0){
        return (
            <div className='rounded-2xl border border-dashed border-s-teal-300 bg-white px-6 py-16 text-center'>
                <h2 className='text-lg font-semibold text-slate-900'>
                    No issues found 
                </h2>
                <p className='mt-2 text-sm text-slate-500'>
                    Try changing your search or filters
                </p>
            </div>
     )
    }
    return(
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'> 
            {issues.map((issue)=>(
                <IssueCard
                key={issue.id}
                issue={issue}
                />
            ))
            }
        </div>
    )
  
}

export default IssueList