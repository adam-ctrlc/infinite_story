'use client'

import { useState } from 'react'
import { UserPlus, UserCheck } from 'lucide-react'

export default function PublicFollowButton({ targetId, initialFollowing, initialCount, hideCount }) {
  const [following, setFollowing] = useState(initialFollowing)
  const [count, setCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    setLoading(true)
    const res = await fetch(`/api/follow/${targetId}`, { method: 'POST' })
    if (res.ok) {
      const data = await res.json()
      setFollowing(data.following)
      setCount(data.followerCount)
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggle}
        disabled={loading}
        className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
          following
            ? 'bg-[#f2f2f2] text-[#242424] hover:bg-[#e6e6e6]'
            : 'bg-[#242424] text-white hover:bg-[#1a1a1a]'
        }`}
      >
        {following ? <UserCheck size={14} /> : <UserPlus size={14} />}
        {following ? 'Following' : 'Follow'}
      </button>
      {!hideCount && (
        <span className="text-sm text-[#6b6b6b]">{count} {count === 1 ? 'follower' : 'followers'}</span>
      )}
    </div>
  )
}
