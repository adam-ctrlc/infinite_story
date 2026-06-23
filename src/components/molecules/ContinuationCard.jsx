'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Heart, MessageCircle, GitBranch, Clock, ArrowRight, Dot } from 'lucide-react'
import Avatar from '@/components/atoms/Avatar'
import { readingTime } from '@/lib/utils'

export default function ContinuationCard({ node }) {
  const [likes, setLikes] = useState(node.likes || 0)
  const [liked, setLiked] = useState(false)
  const name = typeof node.author === 'string' ? node.author : node.author?.name
  const imageUrl = typeof node.author === 'object' ? node.author?.imageUrl : null

  async function handleLike(e) {
    e.preventDefault()
    const res = await fetch(`/api/stories/${node.id}/like`, { method: 'POST' })
    if (res.ok) {
      const data = await res.json()
      setLikes(data.likes)
      setLiked(data.liked)
    }
  }

  return (
    <Link href={`/story/${node.id}`} className="block group">
      <div className="py-5 border border-[#e6e6e6] rounded-sm px-5 hover:border-[#242424] transition-colors bg-white h-full flex flex-col">

        {/* Author row */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar name={name} imageUrl={imageUrl} size="xs" />
          <span className="text-sm font-medium text-[#242424]">{name}</span>
          <Dot size={14} className="text-[#6b6b6b] shrink-0" />
          <span className="text-[#6b6b6b] text-sm">{node.timestamp}</span>
        </div>

        {/* Content */}
        <p
          className="text-[#242424] text-base leading-relaxed line-clamp-4 flex-1 mb-4"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          {node.content}
        </p>

        {/* Divider */}
        <div className="h-px bg-[#e6e6e6] mb-3" />

        {/* Stats row */}
        <div className="flex items-center gap-4 text-[#6b6b6b]">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-xs transition-colors ${
              liked ? 'text-[#c94c4c]' : 'hover:text-[#c94c4c]'
            }`}
          >
            <Heart size={13} className={liked ? 'fill-[#c94c4c]' : ''} />
            <span>{likes}</span>
          </button>

          <span className="flex items-center gap-1 text-xs">
            <MessageCircle size={13} />
            <span>{node.commentCount ?? 0}</span>
          </span>

          {(node.branchCount ?? 0) > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <GitBranch size={13} />
              <span>{node.branchCount}</span>
            </span>
          )}

          <span className="flex items-center gap-1 text-xs ml-auto">
            <Clock size={11} />
            <span>{readingTime(node.content)}</span>
          </span>
        </div>

        {/* Continue link */}
        <span className="text-xs text-[#1a8917] font-medium group-hover:underline mt-3 flex items-center gap-1">
          Continue this thread <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  )
}
