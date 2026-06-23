export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-14 animate-pulse">
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-24">
        {/* Title */}
        <div className="h-12 bg-[#f2f2f2] rounded-lg w-2/3 mb-4" />
        {/* Category pills */}
        <div className="flex gap-2 mb-8">
          {[72, 88, 64, 80, 76, 68, 84, 72].map((w, i) => (
            <div key={i} className="h-7 bg-[#f2f2f2] rounded-full" style={{ width: `${w}px` }} />
          ))}
        </div>
        {/* Editor toolbar */}
        <div className="flex gap-2 mb-4 border border-[#e6e6e6] rounded-t-lg p-2">
          {[28, 28, 28, 28, 8, 36, 36, 8, 28, 28, 28, 8, 28, 28].map((w, i) => (
            <div key={i} className={`h-7 bg-[#f2f2f2] rounded ${w === 8 ? 'w-px' : ''}`} style={{ width: w === 8 ? '1px' : `${w}px` }} />
          ))}
        </div>
        {/* Editor body */}
        <div className="border border-t-0 border-[#e6e6e6] rounded-b-lg p-6 space-y-3 min-h-64">
          {[100, 94, 88, 100, 76, 92, 85].map((w, i) => (
            <div key={i} className="h-5 bg-[#f2f2f2] rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
        {/* Publish button */}
        <div className="flex justify-end mt-6">
          <div className="h-10 bg-[#f2f2f2] rounded-full w-28" />
        </div>
      </div>
    </div>
  )
}
