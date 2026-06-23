'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { UserPlus, UserCheck } from 'lucide-react'

export default function FollowButton({ targetId, targetName }) {
  const { user } = useUser()
  const [following, setFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!targetId) return
    fetch(`/api/follow/${targetId}`)
      .then((r) => r.json())
      .then((d) => { setFollowing(d.following); setFollowerCount(d.followerCount) })
  }, [targetId])

  if (!user || user.id === targetId) return null

  async function handleToggle() {
    setLoading(true)
    const res = await fetch(`/api/follow/${targetId}`, { method: 'POST' })
    if (res.ok) {
      const d = await res.json()
      setFollowing(d.following)
      setFollowerCount(d.followerCount)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors disabled:opacity-50 ${
        following
          ? 'bg-[#f2f2f2] text-[#6b6b6b] border-[#e6e6e6] hover:border-[#c94c4c] hover:text-[#c94c4c]'
          : 'bg-[#242424] text-white border-[#242424] hover:bg-[#3d3d3d]'
      }`}
      title={following ? `Unfollow ${targetName || ''}` : `Follow ${targetName || ''}`}
    >
      {following ? <UserCheck size={12} /> : <UserPlus size={12} />}
      {following ? 'Following' : 'Follow'}
      {followerCount > 0 && <span className="opacity-60 ml-0.5">· {followerCount}</span>}
    </button>
  )
}
