import { Search } from 'lucide-react'

const TABS = ['Following', 'Newest', 'Trending', 'Top Rated', 'Most Discussed', 'Most Branched']

export default function FeedFilters({ activeFilter, setActiveFilter, searchQuery, setSearchQuery }) {
  return (
    <div className="mb-6">
      {/* Search - top */}
      <div className="relative mb-4">
        <label htmlFor="feed-search" className="sr-only">Search stories</label>
        <input
          id="feed-search"
          name="search"
          type="search"
          autoComplete="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search stories..."
          className="w-full bg-[#fafafa] border border-[#e6e6e6] rounded-full py-2 pl-9 pr-4 text-sm text-[#242424] placeholder-[#b3b3b3] focus:outline-none focus:border-[#242424] transition-colors"
        />
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3]" />
      </div>

      {/* Tabs - below search */}
      <div className="flex items-center gap-6 overflow-x-auto border-b border-[#e6e6e6] scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`text-sm font-medium pb-4 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              activeFilter === tab
                ? 'border-[#242424] text-[#242424]'
                : 'border-transparent text-[#6b6b6b] hover:text-[#242424]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
