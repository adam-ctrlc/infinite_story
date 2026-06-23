import Link from 'next/link'
import Avatar from '@/components/atoms/Avatar'

const CATEGORIES = ['Cyberpunk', 'Sci-Fi', 'Mystery', 'Fantasy', 'Horror', 'Romance', 'Thriller', 'Dystopian']
const FOOTER_LINKS = ['Help', 'Writers', 'Blog', 'Privacy', 'Terms', 'About']

function TrendingCard({ story, rank }) {
  const name = typeof story.author === 'string' ? story.author : story.author?.name
  const imageUrl = typeof story.author === 'object' ? story.author?.imageUrl : null

  return (
    <Link href={`/story/${story.id}`} className="flex gap-3 group">
      <span className="text-3xl font-bold text-[#e6e6e6] leading-none mt-0.5 shrink-0 w-6 text-right">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <Avatar name={name} imageUrl={imageUrl} size="xs" />
          <span className="text-xs font-medium text-[#242424]">{name}</span>
        </div>
        <h4
          className="text-sm font-bold text-[#242424] leading-snug line-clamp-2 group-hover:text-[#1a8917] transition-colors mb-1"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          {story.title}
        </h4>
        <p className="text-xs text-[#6b6b6b]">
          {story.readTime || '1 min read'}
          {story.category && <span> · {story.category}</span>}
        </p>
      </div>
    </Link>
  )
}

export default function FeedSidebar({ activeCategory, onCategorySelect, trendingStories = [] }) {
  return (
    <aside className="sticky top-20 space-y-8">

      {/* Trending stories */}
      {trendingStories.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-[#6b6b6b] uppercase tracking-widest mb-5">
            Trending this week
          </h3>
          <div className="space-y-5">
            {trendingStories.map((story, i) => (
              <TrendingCard key={story.id} story={story} rank={i + 1} />
            ))}
          </div>
        </div>
      )}

      {/* Discover genres */}
      <div>
        <h3 className="text-xs font-bold text-[#6b6b6b] uppercase tracking-widest mb-4">Discover</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategorySelect(activeCategory === cat ? null : cat)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? 'bg-[#242424] text-white border-[#242424]'
                  : 'bg-white text-[#6b6b6b] border-[#e6e6e6] hover:border-[#242424] hover:text-[#242424]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-[#6b6b6b]">
        {FOOTER_LINKS.map((link) => (
          <a key={link} href="#" className="hover:text-[#242424] transition-colors">
            {link}
          </a>
        ))}
        <span className="w-full text-[#6b6b6b] mt-1">© 2025 Infinite Story</span>
      </div>
    </aside>
  )
}
