import { useIssues } from '../../../hooks/useIssues'
import IssueList from '../components/IssueList'
import Pagination from '../../../components/layout/Pagination'
import { SlidersHorizontal } from 'lucide-react'
import IssueSearchBar from '../components/IssueSearchBar'
import IssueStatusFilter from '../components/IssueStatusFilter'

const IssuesPage = () => {
    const state = useIssues()
    const from = (state.page - 1) * state.pageSize + 1
    const to = Math.min(state.page * state.pageSize, state.totalCount)
  return (
    <main className='mx-auto max-w-7xl px-4 pb-12 pt-8 sm:pt-10 lg:px-8'>
        <section className='mb-7'>
            <p className='mb-2 inline-flex items-center gap-2 text-sm font-semibold text-blue-700'>
                <span className='h-2 w-2 rounded-full bg-blue-600' />
                REPOSITORY EXPLORER
            </p>
            <h1 className='text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl'>Issues</h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base'>
                Browse and explore issues from the{" "}
                <a 
                  href='https://github.com/react/react'
                  target='_blank'
                  rel='noreferrer'
                  className='font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-800'
                >
                    React
                </a>{" "}
                repository.
            </p>
        </section>
        <section aria-label='Search and filters' className='mb-7 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]'>
            <IssueSearchBar value={state.search} onChange={state.setSearch} />
            <IssueStatusFilter value={state.filter} counts={state.counts} onChange={state.setFilter} />
        </section>
        <section>
            <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
                <h2 className='text-base font-bold text-slate-900'>
                    {state.isLoading
                      ? "Loading issues..."
                      : `${state.totalCount.toLocaleString()} ${state.totalCount === 1 ? "issue" : "issues"} found`
                    }
                </h2>
                <button
                  type='button'
                  onClick={state.reset}
                  className='inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-500 transition hover:bg-white hover:text-slate-800'
                >
                    <SlidersHorizontal size={16}/>
                    Reset filters
                </button>
            </div>
            <IssueList 
              issues={state.issues}
              isLoading={state.isLoading}
              error={state.error}
              />
              {!state.isLoading && !state.error && state.totalCount > state.pageSize && (
                <div className='mt-8'>
                    <Pagination page={state.page} totalPages={state.totalPages} onPageChange={state.setPage} />
                    {state.isTruncated && (
                      <p className="mt-1 text-center text-xs text-amber-700">
                          GitHub only lets you browse the first 1,000 results. Use search to reach older issues.
                     </p>
                   )}
                    <p className='mt-3 text-center text-xs text-slate-500'>
                        Showing {from}-{to} of {state.totalCount.toLocaleString()} issues
                    </p>
                </div>
              )}
        </section>
    </main>
  )
}

export default IssuesPage
