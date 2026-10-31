import React from 'react'
import type { IssueFilter } from '../types';
import { CircleCheckBig, CircleDot, Icon } from 'lucide-react';

interface IssueStatusFilterProps{
    value:string;
    counts:{open: number; closed:number};
    onChange: (value: IssueFilter)=> void
}
const tabs = [
    {key:"open", label:"Open", icon:CircleDot, iconClass: "text-emerald-600"},
    {key:"closed", label:"Closed", icon:CircleCheckBig, iconClass:"text-violet-600"},
] as const
const IssueStatusFilter = ({value, counts, onChange}: IssueStatusFilterProps) => {

  return (
    <div>
        {tabs.map(({key,label,icon:Icon, iconClass}) =>{
            const isActive = value === key;
            return(
                <button 
                  key={key}
                  type='button'
                  onClick={()=> onChange(key)}
                  aria-pressed={isActive}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition sm:min-w-32 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200"
                      : "text-slate-500 hover:bg-slate-50 hover:text-sky-800"
                  }`}
                  >
                    <Icon  size={17} className={iconClass}/>
                    {label}
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        isActive ? "bg-blue-100 text-blue-700" :"bg-slate-100 text-slate-500"
                      }`}
                    >
                        {counts[key].toLocaleString()}
                    </span>  
                  </button>
            )
        })}
    </div>
  )
}

export default IssueStatusFilter