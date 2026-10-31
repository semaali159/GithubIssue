import { useParams,Link } from 'react-router-dom'
import { useIssueDetails } from '../hooks/useIssueDetails'
import { ArrowLeft, MessageSquare } from 'lucide-react'
import IssueStateIcon from '../components/IssueStateIcon'
import LabelBadge from '../components/LabelBadge'
import IssueCommentItem from '../components/IssueCommentItem'
import MarkdownContent from '../../../components/layout/MarkdownContent'
import { formatDate } from '../utils/formatDate'

const IssueDetailsPage = () => {
    const {number} = useParams()
    const {issue, comments, isLoading, error} = useIssueDetails(Number(number))
  return (
    <main className='mx-auto max-w-4xl px-4 pb-12 pt-8 sm:px-6 sm:pt-10 lg:px-8'>
        <Link
          to="/"
          className='mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700'
          >
            <ArrowLeft size={16}/>
            Back to issues
          </Link>
          {isLoading && (
            <div className='space-y-4'>
                <div className='h-10 w-2/3 animate-pulse rounded-xl bg-slate-200'></div>
                <div className='h-48 animate-pulse rounded-2xl border border-slate-200 bg-white'></div>
            </div>
          )

          }
          {!isLoading && error && (
            <div
              role='alert'
              className='rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-700'
            >
                {error}
            </div>
          )}
          {!isLoading && !error && issue && (
            <>
               <header>
                  <div className='flex items-start gap-3'>
                    <IssueStateIcon state={issue.state}/>
                    <h1 className='text-2xl font-bold tracking-tight text-slate-950 [overflow-wrap:anywhere] sm:text-3xl'>
                        {issue.title}{" "}
                        <span className='font-normal text-slate-400'>#{issue.number}</span>
                    </h1>
                  </div>
                  <p>
                    <span className={`mr-2 rounded-full px-3 py-1 text-xs font-semibold ${
                        issue.state === "open"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-violet-50 text-violet-700"
                    }`}>
                        {issue.state === "open" ? "open" :"Closed"}
                    </span>
                    <span className='font-medium text-blue-700'>{issue.author.login}</span> opened this on {" "}
                    {formatDate(issue.createdAt)}
                  </p>
                  {issue.labels.length > 0 && (
                                <div className='mt-4 flex flex-wrap gap-2'>
                                    {issue.labels.map((label)=>(
                                        <LabelBadge key={label.id} label={label}/>
                                    ))}
                                </div>
                  )}
               </header>
               <section className='mt-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6'>
                {
                    issue.body ? (
                        <MarkdownContent>{issue.body}</MarkdownContent>
                    ) : (
                        <p className='text-sm italic text-slate-400'>No description provided.</p>
                    )
                }
               </section>
               <section className='mt-8'>
                <h2 className='mb-4 inline-flex items-center gap-2 text-base font-bold text-slate-900'>
                    <MessageSquare size={18} />
                    <span>
                        {`${issue.commentsCount} ${issue.commentsCount === 1 ? "comment" : "comments"}`}
                    </span>
                </h2>
                <div className='space-y-4'>
                    {comments.map((c)=>(
                        <IssueCommentItem key={c.id} comment={c}/>
                    ))}
                </div>
                {issue.commentsCount > comments.length && (
                    <p className='mt-4 text-center text-sm text-slate-500'>
                        Showing the first {comments.length} comments.
                        <a 
                          href={`https://github.com/facebook/react/issues/${issue.number}`}
                          target='_blank'
                          rel='noreferrer'
                          className='font-medium text-blue-700 underline'
                        >
                            View all on Github
                        </a>    
                    </p>
                )}
               </section>
            </>
          )}
    </main>
  )
}

export default IssueDetailsPage
