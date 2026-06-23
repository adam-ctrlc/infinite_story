function CardSkeleton() {
  return (
    <div className="py-8 border-b border-[#e6e6e6]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-[#f2f2f2]" />
        <div className="h-3 bg-[#f2f2f2] rounded w-24" />
      </div>
      <div className="h-6 bg-[#f2f2f2] rounded w-3/4 mb-2" />
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-[#f2f2f2] rounded w-full" />
        <div className="h-4 bg-[#f2f2f2] rounded w-5/6" />
      </div>
      <div className="flex gap-4">
        <div className="h-3 bg-[#f2f2f2] rounded w-16" />
        <div className="h-3 bg-[#f2f2f2] rounded w-20" />
        <div className="h-3 bg-[#f2f2f2] rounded w-14" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-14 animate-pulse">
      <div className="max-w-5xl mx-auto px-6 py-8 flex gap-10">

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Filters */}
          <div className="flex gap-6 mb-8 border-b border-[#e6e6e6] pb-4">
            {[80, 64, 72, 88, 100, 96].map((w, i) => (
              <div key={i} className="h-4 bg-[#f2f2f2] rounded" style={{ width: `${w}px` }} />
            ))}
          </div>
          {[1, 2, 3, 4, 5].map((i) => <CardSkeleton key={i} />)}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-72 shrink-0 pt-2 space-y-6">
          <div className="h-5 bg-[#f2f2f2] rounded w-36 mb-4" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="h-5 w-5 bg-[#f2f2f2] rounded shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 bg-[#f2f2f2] rounded w-4/5" />
                <div className="h-3 bg-[#f2f2f2] rounded w-1/2" />
              </div>
            </div>
          ))}
          <div className="border-t border-[#e6e6e6] pt-6">
            <div className="h-5 bg-[#f2f2f2] rounded w-28 mb-4" />
            <div className="flex flex-wrap gap-2">
              {[60, 72, 56, 80, 64, 68].map((w, i) => (
                <div key={i} className="h-7 bg-[#f2f2f2] rounded-full" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
