import { Search, X } from 'lucide-react';
import React from 'react'

interface IssueSearchBarProps{
    value:string;
    onChange:(value:string) => void
}
const IssueSearchBar = ({value, onChange}:IssueSearchBarProps) => {

  return (
    <label className='flex min-h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm shadow-slate-900/[0.02] transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100'>
        <Search className='shrink-0 text-slate-400' size={21}/>
        <input 
          type='search'
          value={value}
          onChange={(e)=> onChange(e.target.value)}
          placeholder='Search by title or descriotion...'
          className='min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base'
          aria-label='Search issues by title or description'
        />
        {value && (
            <button
              type='button'
              onClick={()=> onChange("")}
              className='rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700'
              aria-label='clear search'
            >
                <X size={17} />
            </button>  
        )}
    </label>
  )
}

export default IssueSearchBar