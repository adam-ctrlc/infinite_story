import { SearchX } from "lucide-react";
import FeedCard from "./FeedCard";

export default function FeedList({ stories, onClearFilters }) {
  if (!stories || stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
        <div className="bg-gray-900/50 p-8 rounded-full border border-gray-800 mb-6 shadow-2xl ring-1 ring-gray-800/50">
          <SearchX size={64} className="text-gray-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-200 mb-3">
          No stories found
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
          We couldn't find any stories matching your current criteria. Try
          adjusting your filters or search terms.
        </p>

        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium rounded-xl transition-all border border-gray-700 hover:border-gray-600 shadow-lg hover:shadow-xl active:scale-95"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {stories.map((story) => (
        <FeedCard key={story.id} story={story} />
      ))}
    </div>
  );
}
