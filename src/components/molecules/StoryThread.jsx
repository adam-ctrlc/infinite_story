'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'
import Avatar from '@/components/atoms/Avatar'

function ThreadEntry({ ancestor, index }) {
  const [open, setOpen] = useState(false)
  const name = typeof ancestor.author === 'string' ? ancestor.author : ancestor.author?.name
  const imageUrl = typeof ancestor.author === 'object' ? ancestor.author?.imageUrl : null

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2.5 text-sm text-[#6b6b6b] hover:text-[#242424] transition-colors group text-left"
      >
        <span className="shrink-0 w-5 h-5 rounded-full bg-[#f2f2f2] text-[#6b6b6b] text-[10px] font-bold flex items-center justify-center">
          {index + 1}
        </span>
        {open
          ? <ChevronDown size={13} className="shrink-0 text-[#b3b3b3]" />
          : <ChevronRight size={13} className="shrink-0 text-[#b3b3b3]" />
        }
        <span className="line-clamp-1">
          <span className="font-medium group-hover:underline underline-offset-2">
            {ancestor.title || name}
          </span>
          {ancestor.title && <span className="text-[#b3b3b3]"> by {name}</span>}
        </span>
      </button>

      {open && (
        <div className="mt-3 ml-5 pl-4 border-l border-[#e6e6e6]">
          <div className="flex items-center gap-2 mb-2">
            <Avatar name={name} imageUrl={imageUrl} size="xs" />
            <span className="text-xs font-medium text-[#242424]">{name}</span>
            <span className="text-xs text-[#6b6b6b]">{ancestor.timestamp}</span>
          </div>
          {ancestor.content?.startsWith('<') ? (
            <div
              className="story-content text-sm mb-3 [&_p]:mb-2 [&_h2]:text-base [&_h3]:text-sm"
              dangerouslySetInnerHTML={{ __html: ancestor.content }}
            />
          ) : (
            <p
              className="text-sm text-[#242424] leading-relaxed mb-3"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {ancestor.content}
            </p>
          )}
          <Link
            href={`/story/${ancestor.id}`}
            className="text-xs text-[#1a8917] hover:underline underline-offset-2"
          >
            View full page
          </Link>
        </div>
      )}
    </div>
  )
}

export default function StoryThread({ ancestors }) {
  const [expanded, setExpanded] = useState(false)

  if (!ancestors.length) return null

  const THRESHOLD = 3
  const isLong = ancestors.length > THRESHOLD

  // Each entry is [ancestor, realIndex] or null for the collapse button
  const visibleItems = !isLong || expanded
    ? ancestors.map((a, i) => [a, i])
    : [[ancestors[0], 0], null, [ancestors[ancestors.length - 1], ancestors.length - 1]]

  const hiddenCount = ancestors.length - 2

  return (
    <div className="mb-10">
      <p className="text-xs font-medium text-[#6b6b6b] uppercase tracking-widest mb-4">Story thread</p>
      <div className="space-y-3">
        {visibleItems.map((item, i) => {
          if (item === null) {
            return (
              <button
                key="expand"
                onClick={() => setExpanded(true)}
                className="flex items-center gap-2 text-sm text-[#6b6b6b] hover:text-[#242424] transition-colors pl-0.5"
              >
                <span className="flex flex-col gap-[3px] ml-0.5">
                  <span className="w-0.5 h-0.5 rounded-full bg-current" />
                  <span className="w-0.5 h-0.5 rounded-full bg-current" />
                  <span className="w-0.5 h-0.5 rounded-full bg-current" />
                </span>
                <span className="underline underline-offset-2">{hiddenCount} more step{hiddenCount !== 1 ? 's' : ''}</span>
              </button>
            )
          }
          const [a, realIndex] = item
          return <ThreadEntry key={a.id} ancestor={a} index={realIndex} />
        })}
      </div>
      <div className="h-px bg-[#e6e6e6] mt-6" />
    </div>
  )
}
