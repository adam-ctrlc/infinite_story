'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, GitBranch, Clock, MessageCircle, BookOpen, Users, Eye, EyeOff } from 'lucide-react'
import Avatar from '@/components/atoms/Avatar'
import FollowButton from '@/components/atoms/FollowButton'

function VisibilityToggle({ storyId, initialVisibility }) {
  const [visibility, setVisibility] = useState(initialVisibility || 'public')
  const [loading, setLoading] = useState(false)

  async function toggle(e) {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    const next = visibility === 'public' ? 'private' : 'public'
    const res = await fetch(`/api/stories/${storyId}/visibility`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visibility: next }),
    })
    if (res.ok) setVisibility(next)
    setLoading(false)
  }

  const isPrivate = visibility === 'private'
  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={isPrivate ? 'Private — click to make public' : 'Public — click to make private'}
      className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border transition-colors shrink-0 ${
        isPrivate
          ? 'border-[#f2a600] text-[#f2a600] bg-[#fff9ec] hover:bg-[#fff3d6]'
          : 'border-[#e6e6e6] text-[#6b6b6b] hover:border-[#242424] hover:text-[#242424]'
      }`}
    >
      {isPrivate ? <EyeOff size={10} /> : <Eye size={10} />}
      {isPrivate ? 'Private' : 'Public'}
    </button>
  )
}

function StoryRow({ node, showVisibility }) {
  return (
    <Link href={`/story/${node.id}`} className="block group py-5 border-b border-[#e6e6e6] last:border-0">
      <div className="flex-1 min-w-0">
        {node.title ? (
          <h3
            className="text-base font-bold text-[#242424] group-hover:text-[#1a8917] transition-colors leading-snug mb-1 line-clamp-2"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
          >
            {node.title}
          </h3>
        ) : null}
        <p className="text-sm text-[#6b6b6b] line-clamp-2 leading-relaxed">
          {node.snippet}
        </p>
      </div>
      <div className="flex items-center gap-4 mt-3 flex-wrap">
        {node.category && (
          <span className="text-xs bg-[#f2f2f2] text-[#6b6b6b] px-2.5 py-0.5 rounded-full">{node.category}</span>
        )}
        {node.readTime && (
          <span className="flex items-center gap-1 text-xs text-[#6b6b6b]"><Clock size={11} />{node.readTime}</span>
        )}
        {showVisibility && (
          <VisibilityToggle storyId={node.id} initialVisibility={node.visibility} />
        )}
        <div className="flex items-center gap-3 ml-auto">
          <span className="flex items-center gap-1 text-xs text-[#6b6b6b]"><Heart size={11} />{node.likes ?? 0}</span>
          <span className="flex items-center gap-1 text-xs text-[#6b6b6b]"><MessageCircle size={11} />{node.commentCount ?? 0}</span>
          <span className="flex items-center gap-1 text-xs text-[#6b6b6b]"><GitBranch size={11} />{node.branchCount ?? 0}</span>
        </div>
        <span className="text-xs text-[#b3b3b3]">{node.timestamp}</span>
      </div>
    </Link>
  )
}

function UserRow({ person }) {
  const name = person?.name || person?.id || 'Unknown'
  const imageUrl = person?.imageUrl || null

  return (
    <div className="flex items-center gap-3 py-4 border-b border-[#e6e6e6] last:border-0">
      <Link href={`/u/${person?.id}`}>
        <Avatar name={name} imageUrl={imageUrl} size="md" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/u/${person?.id}`} className="text-sm font-medium text-[#242424] hover:underline">{name}</Link>
        <p className="text-xs text-[#6b6b6b]">@{name?.toLowerCase().replace(/\s+/g, '')}</p>
      </div>
      <FollowButton targetId={person?.id} targetName={name} />
    </div>
  )
}

function EmptyState({ label, icon: Icon = BookOpen }) {
  return (
    <div className="py-16 flex flex-col items-center text-center">
      <Icon size={32} className="text-[#e6e6e6] mb-4" />
      <p className="text-[#242424] font-medium mb-1">Nothing here yet</p>
      <p className="text-sm text-[#6b6b6b]">Your {label.toLowerCase()} will appear here.</p>
    </div>
  )
}

const TABS = ['Stories', 'Branches', 'Likes', 'Followers', 'Following']

export default function ProfileTabs({ stories, branches, liked, followers = [], following = [] }) {
  const [active, setActive] = useState('Stories')

  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash
      const match = hash.match(/^#tab-(.+)$/)
      if (match) {
        const tab = decodeURIComponent(match[1])
        if (TABS.includes(tab)) setActive(tab)
        document.getElementById('profile-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const lists = { Stories: stories, Branches: branches, Likes: liked, Followers: followers, Following: following }
  const current = lists[active] || []
  const isUserList = active === 'Followers' || active === 'Following'

  return (
    <div id="profile-tabs" className="max-w-5xl mx-auto px-6 py-8 scroll-mt-20">
      <div className="flex items-center gap-8 border-b border-[#e6e6e6] mb-0 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`text-sm font-medium pb-4 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              active === tab
                ? 'border-[#242424] text-[#242424]'
                : 'border-transparent text-[#6b6b6b] hover:text-[#242424]'
            }`}
          >
            {tab}
            <span className="ml-1.5 text-xs text-[#b3b3b3]">({lists[tab]?.length ?? 0})</span>
          </button>
        ))}
      </div>

      <div>
        {current.length === 0 ? (
          <EmptyState label={active} icon={isUserList ? Users : BookOpen} />
        ) : isUserList ? (
          current.map((person, i) => <UserRow key={person?.id || i} person={person} />)
        ) : (
          current.map((node) => (
            <StoryRow key={node.id} node={node} showVisibility={active === 'Stories'} />
          ))
        )}
      </div>
    </div>
  )
}
