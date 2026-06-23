'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Heart, GitBranch, MessageCircle, Clock, Dot } from 'lucide-react'
import Avatar from '@/components/atoms/Avatar'

export default function StoryCard({ story }) {
  const [likes, setLikes] = useState(story.likes || 0)
  const [liked, setLiked] = useState(false)
  const name = typeof story.author === 'string' ? story.author : story.author?.name
  const imageUrl = typeof story.author === 'object' ? story.author?.imageUrl : null

  async function handleLike(e) {
    e.preventDefault()
    const res = await fetch(`/api/stories/${story.id}/like`, { method: 'POST' })
    if (res.ok) {
      const data = await res.json()
      setLikes(data.likes)
      setLiked(data.liked)
    }
  }

  return (
    <article className="py-8 border-b border-[#e6e6e6] group">
      {/* Author row */}
      <div className="flex items-center gap-2 mb-4">
        <Avatar name={name} imageUrl={imageUrl} size="sm" />
        <span className="text-sm text-[#242424] font-medium">{name}</span>
        <Dot size={14} className="text-[#6b6b6b] shrink-0" />
        <span className="text-[#6b6b6b] text-sm">{story.timestamp}</span>
      </div>

      {/* Content */}
      <Link href={`/story/${story.id}`} className="block">
        <div className="flex gap-6 items-start">
          <div className="flex-1 min-w-0">
            <h2
              className="text-xl font-bold text-[#242424] mb-2 leading-snug group-hover:text-[#1a8917] transition-colors line-clamp-2"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {story.title}
            </h2>
            <p className="text-[#6b6b6b] text-base leading-relaxed line-clamp-3">
              {story.snippet || story.content}
            </p>
          </div>
        </div>
      </Link>

      {/* Footer row */}
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        {story.category && (
          <span className="text-xs bg-[#f2f2f2] text-[#6b6b6b] px-3 py-1 rounded-full font-medium">
            {story.category}
          </span>
        )}

        {/* Read time */}
        {story.readTime && (
          <span className="flex items-center gap-1 text-xs text-[#6b6b6b]">
            <Clock size={12} />
            {story.readTime}
          </span>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Comments */}
          <span className="flex items-center gap-1 text-xs text-[#6b6b6b]">
            <MessageCircle size={13} />
            <span>{story.commentCount ?? 0}</span>
          </span>

          {/* Branches */}
          <span className="flex items-center gap-1 text-xs text-[#6b6b6b]">
            <GitBranch size={13} />
            <span>{story.branchCount ?? story.continuationCount ?? 0}</span>
          </span>

          {/* Likes */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-xs transition-colors ${
              liked ? 'text-[#c94c4c]' : 'text-[#6b6b6b] hover:text-[#c94c4c]'
            }`}
          >
            <Heart size={13} className={liked ? 'fill-[#c94c4c]' : ''} />
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
