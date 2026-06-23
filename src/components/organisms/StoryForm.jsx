'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import RichEditor from '@/components/organisms/RichEditor'

const CATEGORIES = ['Sci-Fi', 'Fantasy', 'Cyberpunk', 'Mystery', 'Horror', 'Romance', 'Thriller', 'Dystopian']

export default function StoryForm() {
  const router = useRouter()
  const { user } = useUser()
  const [isPending, startTransition] = useTransition()
  const [category, setCategory] = useState('Sci-Fi')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!title.trim() || !content || content === '<p></p>') {
      setError('Title and content are required.')
      return
    }

    const res = await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        content,
        category,
        author: {
          id: user?.id || 'anonymous',
          name: user?.username || user?.firstName || 'Anonymous',
          imageUrl: user?.imageUrl || null,
        },
      }),
    })

    if (res.ok) {
      const story = await res.json()
      startTransition(() => router.push(`/story/${story.id}`))
    } else {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-0 pt-10 pb-20">
      {/* Title */}
      <label htmlFor="story-title" className="sr-only">Story title</label>
      <input
        id="story-title"
        name="title"
        type="text"
        autoComplete="off"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full text-4xl font-bold text-[#242424] placeholder-[#b3b3b3] bg-transparent border-none outline-none mb-2 leading-tight"
        style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
      />

      {/* Category row */}
      <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-[#e6e6e6]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              category === cat
                ? 'bg-[#242424] text-white border-[#242424]'
                : 'bg-white text-[#6b6b6b] border-[#e6e6e6] hover:border-[#242424] hover:text-[#242424]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rich editor */}
      <RichEditor onChange={setContent} placeholder="Tell your story..." />

      {error && <p className="text-[#c94c4c] text-sm mt-6">{error}</p>}

      <div className="flex items-center justify-between border-t border-[#e6e6e6] mt-10 pt-6">
        <p className="text-sm text-[#6b6b6b] hidden md:block">
          Use the toolbar above to format your story, add images, and more.
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-[#1a8917] text-white text-sm font-medium rounded-full hover:bg-[#157013] transition-colors disabled:opacity-50"
        >
          {isPending ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </form>
  )
}
