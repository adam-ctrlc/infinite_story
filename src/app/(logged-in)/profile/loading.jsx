export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-14 animate-pulse">

      {/* Profile header */}
      <div className="border-b border-[#e6e6e6] py-10 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-[#f2f2f2] shrink-0" />
          <div className="flex-1 w-full">
            <div className="h-7 bg-[#f2f2f2] rounded w-40 mb-2" />
            <div className="h-4 bg-[#f2f2f2] rounded w-24 mb-4" />
            <div className="flex gap-6">
              {[48, 56, 44, 60, 64].map((w, i) => (
                <div key={i} className="h-4 bg-[#f2f2f2] rounded" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Settings section placeholder */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="h-5 bg-[#f2f2f2] rounded w-32 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-[#f2f2f2] rounded-lg w-full" />
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-[#e6e6e6]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex gap-6 py-4 border-b border-[#e6e6e6]">
            {[72, 80, 56, 80, 80].map((w, i) => (
              <div key={i} className="h-4 bg-[#f2f2f2] rounded" style={{ width: `${w}px` }} />
            ))}
          </div>
          <div className="py-8 space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-[#f2f2f2] rounded w-3/4" />
                  <div className="h-4 bg-[#f2f2f2] rounded w-full" />
                  <div className="h-4 bg-[#f2f2f2] rounded w-2/3" />
                  <div className="flex gap-4 pt-1">
                    <div className="h-3 bg-[#f2f2f2] rounded w-16" />
                    <div className="h-3 bg-[#f2f2f2] rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
