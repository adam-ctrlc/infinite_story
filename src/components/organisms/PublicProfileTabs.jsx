import Link from 'next/link'
import { Clock, MessageCircle, GitBranch, Heart } from 'lucide-react'

function StoryRow({ story }) {
  return (
    <div className="py-6 border-b border-[#e6e6e6] last:border-0">
      <Link href={`/story/${story.id}`} className="group block">
        <h3 className="text-lg font-bold text-[#242424] group-hover:text-[#1a8917] transition-colors mb-1 leading-snug">
          {story.title || 'Untitled'}
        </h3>
        {story.snippet && (
          <p className="text-[#6b6b6b] text-sm leading-relaxed mb-3 line-clamp-2">{story.snippet}</p>
        )}
      </Link>
      <div className="flex items-center gap-4 text-xs text-[#6b6b6b]">
        {story.category && (
          <span className="px-2 py-0.5 rounded-full bg-[#f2f2f2] font-medium">{story.category}</span>
        )}
        <span className="flex items-center gap-1"><Clock size={11} />{story.readTime}</span>
        <span className="flex items-center gap-1"><Heart size={11} />{story.likes}</span>
        <span className="flex items-center gap-1"><MessageCircle size={11} />{story.commentCount}</span>
        <span className="flex items-center gap-1"><GitBranch size={11} />{story.branchCount}</span>
        <span className="ml-auto">{story.timestamp}</span>
      </div>
    </div>
  )
}

export default function PublicProfileTabs({ stories }) {
  if (!stories.length) {
    return (
      <p className="text-center text-[#6b6b6b] text-sm py-16">No public stories yet.</p>
    )
  }

  return (
    <div>
      <h2 className="text-sm font-bold text-[#6b6b6b] uppercase tracking-widest mb-4">
        Stories ({stories.length})
      </h2>
      <div>
        {stories.map((s) => <StoryRow key={s.id} story={s} />)}
      </div>
    </div>
  )
}
