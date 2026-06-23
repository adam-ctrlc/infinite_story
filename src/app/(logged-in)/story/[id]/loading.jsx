export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-14 animate-pulse">
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-24">

        {/* Title */}
        <div className="h-12 bg-[#f2f2f2] rounded-lg w-4/5 mb-4" />
        <div className="h-10 bg-[#f2f2f2] rounded-lg w-3/5 mb-8" />

        {/* Author row */}
        <div className="flex items-center gap-3 mb-10 pb-8 border-b border-[#e6e6e6]">
          <div className="w-9 h-9 rounded-full bg-[#f2f2f2] shrink-0" />
          <div className="flex flex-col gap-1.5">
            <div className="h-3.5 bg-[#f2f2f2] rounded w-28" />
            <div className="h-3 bg-[#f2f2f2] rounded w-20" />
          </div>
          <div className="ml-auto flex gap-3">
            <div className="h-3 bg-[#f2f2f2] rounded w-16" />
            <div className="h-3 bg-[#f2f2f2] rounded w-12" />
          </div>
        </div>

        {/* Body paragraphs */}
        <div className="space-y-3 mb-6">
          {[100, 95, 88, 100, 72, 96, 84, 100, 60].map((w, i) => (
            <div key={i} className="h-5 bg-[#f2f2f2] rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="space-y-3 mb-6">
          {[100, 91, 78, 100, 65].map((w, i) => (
            <div key={i} className="h-5 bg-[#f2f2f2] rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="space-y-3 mb-12">
          {[100, 87, 94, 55].map((w, i) => (
            <div key={i} className="h-5 bg-[#f2f2f2] rounded" style={{ width: `${w}%` }} />
          ))}
        </div>

        {/* Reaction bar */}
        <div className="flex gap-6 py-6 border-t border-b border-[#e6e6e6] mb-12">
          {[40, 48, 36].map((w, i) => (
            <div key={i} className="h-4 bg-[#f2f2f2] rounded" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
