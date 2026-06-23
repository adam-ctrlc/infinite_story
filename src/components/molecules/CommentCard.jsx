'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import Avatar from '@/components/atoms/Avatar'
import { timeAgo } from '@/lib/utils'

export default function CommentCard({ comment }) {
  const [likes, setLikes] = useState(comment.likes || 0)
  const [liked, setLiked] = useState(false)
  const name = typeof comment.author === 'string' ? comment.author : comment.author?.name
  const imageUrl = typeof comment.author === 'object' ? comment.author?.imageUrl : null

  async function handleLike() {
    const res = await fetch(`/api/stories/${comment.nodeId}/comment/${comment.id}/like`, { method: 'POST' })
    if (res.ok) {
      const data = await res.json()
      setLikes(data.likes)
      setLiked(data.liked)
    }
  }

  return (
    <div className="flex gap-3 py-5 border-b border-[#e6e6e6] last:border-0">
      <Avatar name={name} imageUrl={imageUrl} size="sm" className="shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-sm font-medium text-[#242424]">{name}</span>
          <span className="text-xs text-[#6b6b6b]">{timeAgo(comment.createdAt)}</span>
        </div>
        <p className="text-[#242424] text-sm leading-relaxed">{comment.content}</p>
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 mt-2 text-xs transition-colors ${
            liked ? 'text-[#c94c4c]' : 'text-[#6b6b6b] hover:text-[#c94c4c]'
          }`}
        >
          <Heart size={12} className={liked ? 'fill-[#c94c4c]' : ''} />
          <span>{likes}</span>
        </button>
      </div>
    </div>
  )
}
