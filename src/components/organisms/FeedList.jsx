import StoryCard from '@/components/molecules/StoryCard'

export default function FeedList({ stories, onClearFilters }) {
  if (!stories || stories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-[#242424] font-medium mb-2">No stories found</p>
        <p className="text-[#6b6b6b] text-sm mb-6">Try adjusting your filters or search term.</p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-[#1a8917] hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div>
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  )
}
