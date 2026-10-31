import MarkdownContent from "../../../components/layout/MarkdownContent"
import type { IssueComment } from "../types"

const IssueCommentItem = ({comment}:{comment:IssueComment}) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5" >
        <header className="mb-3 flex items-center gap-3">
            {comment.user.avatarUrl ? (
                <img 
                   src={comment.user.avatarUrl}
                   alt=""
                   loading="lazy"
                   className="h-8 w-8 rounded-full bg-slate-100"
                />   
            ):(
                <span className="h-8 w-8 rounded-full bg-slate-200" />
            )
        }
        <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">{comment.user.login}</span>
            <span className="mx-1.5">.</span>
            {comment.createdAt}
        </p>
        </header>
        <MarkdownContent>{comment.body}</MarkdownContent>
    </article>
  )
}

export default IssueCommentItem