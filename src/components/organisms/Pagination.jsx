import { ChevronLeft, ChevronRight } from 'lucide-react'

function pageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = []
  pages.push(1)
  if (current > 3) pages.push('…')
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i)
  }
  if (current < total - 2) pages.push('…')
  pages.push(total)
  return pages
}

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null

  const pages = pageRange(currentPage, totalPages)

  return (
    <div className="flex items-center justify-center gap-1 mt-10 py-4">
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="p-2 text-[#6b6b6b] hover:text-[#242424] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, i) =>
        page === '…' ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-[#6b6b6b] select-none">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-full transition-colors ${
              currentPage === page
                ? 'bg-[#242424] text-white'
                : 'text-[#6b6b6b] hover:text-[#242424]'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="p-2 text-[#6b6b6b] hover:text-[#242424] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
