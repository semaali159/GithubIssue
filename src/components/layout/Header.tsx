import { BookOpen, Bug } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Issue Browser home">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-900">
            <Bug size={25} strokeWidth={2.2} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl">Issue Browser</span>
            <span className="block text-sm text-slate-500 sm:text-base">GitHub Issue Explorer</span>
          </span>
        </Link>
        <a
          href="https://github.com/facebook/react"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:px-4"
        >
          <BookOpen size={17} className="text-blue-600" />
          <span className="hidden sm:inline">facebook / </span>
          <span className="font-semibold text-blue-600">react</span>
        </a>
      </div>
    </header>
  );
}