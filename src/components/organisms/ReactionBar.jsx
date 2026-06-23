'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Clock } from 'lucide-react'
import StarRating from '@/components/atoms/StarRating'

export default function ReactionBar({ nodeId, initialLikes, commentCount, readTime }) {
  const [likes, setLikes] = useState(initialLikes || 0)
  const [liked, setLiked] = useState(false)
  const [rating, setRating] = useState({ average: 0, count: 0, userRating: 0 })

  useEffect(() => {
    fetch(`/api/stories/${nodeId}/rate`)
      .then((r) => r.json())
      .then(setRating)
  }, [nodeId])

  async function handleLike() {
    const res = await fetch(`/api/stories/${nodeId}/like`, { method: 'POST' })
    if (res.ok) {
      const data = await res.json()
      setLikes(data.likes)
      setLiked(data.liked)
    }
  }

  async function handleRate(star) {
    const res = await fetch(`/api/stories/${nodeId}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating: star }),
    })
    if (res.ok) {
      const data = await res.json()
      setRating(data)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-6 py-6 border-t border-b border-[#e6e6e6] my-10">
      {/* Like */}
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 transition-colors ${
          liked ? 'text-[#c94c4c]' : 'text-[#6b6b6b] hover:text-[#c94c4c]'
        }`}
      >
        <Heart size={20} className={liked ? 'fill-[#c94c4c]' : ''} />
        <span className="text-sm font-medium">{likes}</span>
      </button>

      {/* Comment count */}
      <button
        onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
        className="flex items-center gap-2 text-[#6b6b6b] hover:text-[#242424] transition-colors"
      >
        <MessageCircle size={20} />
        <span className="text-sm font-medium">{commentCount}</span>
      </button>

      {/* Read time */}
      {readTime && (
        <span className="flex items-center gap-1.5 text-sm text-[#6b6b6b]">
          <Clock size={15} />
          {readTime}
        </span>
      )}

      {/* Divider */}
      <div className="h-5 w-px bg-[#e6e6e6]" />

      {/* Star rating */}
      <div className="flex items-center gap-3">
        <StarRating
          value={rating.userRating || rating.average}
          onChange={handleRate}
          size={18}
        />
        <div className="text-sm text-[#6b6b6b]">
          {rating.average > 0 ? (
            <span>
              <span className="font-medium text-[#242424]">{rating.average}</span>
              <span className="ml-1">({rating.count} {rating.count === 1 ? 'rating' : 'ratings'})</span>
            </span>
          ) : (
            <span>Rate this story</span>
          )}
        </div>
      </div>
    </div>
  )
}
