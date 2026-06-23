export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-14 animate-pulse">
      <div className="border-b border-[#e6e6e6] py-12 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-[#f2f2f2] shrink-0" />
          <div className="flex-1">
            <div className="h-7 bg-[#f2f2f2] rounded w-40 mb-2" />
            <div className="h-4 bg-[#f2f2f2] rounded w-24 mb-4" />
            <div className="flex gap-5 mb-5">
              {[60, 72, 68].map((w, i) => <div key={i} className="h-4 bg-[#f2f2f2] rounded" style={{ width: `${w}px` }} />)}
            </div>
            <div className="h-8 bg-[#f2f2f2] rounded-full w-24" />
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="py-6 border-b border-[#e6e6e6]">
            <div className="h-5 bg-[#f2f2f2] rounded w-3/4 mb-2" />
            <div className="h-4 bg-[#f2f2f2] rounded w-full mb-1" />
            <div className="h-4 bg-[#f2f2f2] rounded w-2/3 mb-3" />
            <div className="flex gap-4">
              <div className="h-3 bg-[#f2f2f2] rounded w-14" />
              <div className="h-3 bg-[#f2f2f2] rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
