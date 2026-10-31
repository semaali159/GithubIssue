import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const MarkdownContent = ({children}:{children:string}) => {
  return (
    <div
       className="space-y-3 text-sm leading-6 text-slate-700 [overflow-wrap:anywhere]
        [&_a]:font-medium [&_a]:text-blue-700 [&_a]:underline [&_a]:underline-offset-2
        [&_blockquote]:border-l-4 [&_blockquote]:border-slate-200 [&_blockquote]:pl-3 [&_blockquote]:text-slate-500
        [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em]
        [&_h1]:text-lg [&_h1]:font-bold [&_h2]:text-base [&_h2]:font-bold [&_h3]:font-semibold
        [&_img]:max-w-full [&_img]:rounded-lg
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5
        [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-slate-900 [&_pre]:p-3 [&_pre]:text-xs [&_pre]:text-slate-100
        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit
        [&_table]:block [&_table]:overflow-x-auto [&_td]:border [&_td]:border-slate-200 [&_td]:px-2 [&_td]:py-1
        [&_th]:border [&_th]:border-slate-200 [&_th]:px-2 [&_th]:py-1"
    >
        <ReactMarkdown 
           remarkPlugins={[remarkGfm]}
           components={{
            a:({href,children: linkChildren})=>(
                <a href={href} target="_blank" rel="noreferrer">
                    {linkChildren}
                </a>
            )
           }}
        >
            {children}
        </ReactMarkdown>
    </div>
  )
}

export default MarkdownContent