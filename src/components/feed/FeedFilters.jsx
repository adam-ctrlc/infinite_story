import { Search } from "lucide-react";

export default function FeedFilters({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
}) {
  const tabs = ["Newest", "Trending", "Relevance"];

  // Note: 'Relevance' uses the simple search, 'Newest' sorts by time, 'Trending' by likes.

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4 mb-8">
      {/* Tabs */}
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`text-sm font-medium pb-4 border-b-2 transition-colors whitespace-nowrap ${
              activeFilter === tab
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search stories..."
          className="w-full bg-gray-900/50 border border-gray-800 rounded-full py-2 pl-10 pr-4 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>
    </div>
  );
}
