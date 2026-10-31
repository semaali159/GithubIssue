import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | "start-ellipsis" | "end-ellipsis";

function getPageItems(page: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  const items: PageItem[] = [1];

  if (start > 2) items.push("start-ellipsis");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < totalPages - 1) items.push("end-ellipsis");

  items.push(totalPages);
  return items;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const items = getPageItems(page, totalPages);

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-1.5">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {items.map((item) =>
        typeof item === "string" ? (
          <span key={item} className="px-1 text-slate-400">…</span>
        ) : (
          <button
            type="button"
            key={item}
            onClick={() => onPageChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition ${
              item === page
                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}