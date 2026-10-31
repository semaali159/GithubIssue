import {  MessageSquare } from 'lucide-react';
import type { Issue } from '../types';
import IssueStateIcon from './IssueStateIcon';
import LabelBadge from './LabelBadge';
import {  Link} from 'react-router-dom';


interface IssueCardProps{
    issue:Issue;
}

const IssueCard = ({issue}: IssueCardProps) => {
    const isOpen = issue.state === "open"
    const formattedDate = new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(issue.createdAt))

  return (
    <article className='group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/[0.06]'>
        <div className='flex items-start gap-3'>
            <IssueStateIcon state={issue.state} />
            <div className='min-w-0 flex-1'>
                <h2 className='font-semibold leading-6 text-slate-900 transition group-hover:text-blue-700'>
                    <Link 
                       to={`/issues/${issue.number}`}
                       className="line-clamp-2 text-left focus-visible:outline-none after:absolute after:inset-0 after:content-['']"
                    >
                        {issue.title}
                    </Link>
                </h2>
                <p className='mt-1.5 text-sm text-slate-500'>
                    <span>#{issue.number}</span>
                    <span className="mx-1.5">·</span>
                    <span>{isOpen ? "opened" : "closed"} by </span>
                    <span className="font-medium text-blue-700">{issue.author.login}</span>
                </p>
            </div>
        </div>
        {issue.labels.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
                {issue.labels.map((label)=>(
                    <LabelBadge key={label.id} label={label} />
                ))}
            </div>
        )}
        <div className='mt-auto flex items-center justify-between gap-3 pt-5 text-sm text-slate-500'>
            <span className='inline-flex items-center gap-2'>
                <MessageSquare size={17} strokeWidth={1.8}/>
                <span>{issue.commentsCount}</span>
                <span className='sr-only'>comments</span>
            </span>
            <span>{formattedDate}</span>
        </div>
    </article>   
  )
}

export default IssueCard
