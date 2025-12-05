import FeedCard from "./FeedCard";

export default function FeedList({ stories }) {
  if (!stories || stories.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No stories found matching your criteria.
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
