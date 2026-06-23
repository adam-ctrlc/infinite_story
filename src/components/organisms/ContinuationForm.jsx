'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

export default function ContinuationForm({ nodeId }) {
  const router = useRouter()
  const { user } = useUser()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)
    setError(null)

    const res = await fetch(`/api/stories/${nodeId}/continue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: content.trim(),
        author: {
          id: user?.id || 'anonymous',
          name: user?.username || user?.firstName || 'Anonymous',
          imageUrl: user?.imageUrl || null,
        },
      }),
    })

    if (res.ok) {
      setContent('')
      router.refresh()
    } else {
      setError('Failed to submit. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className="mt-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-[#e6e6e6]" />
        <h2
          className="text-xs font-bold text-[#6b6b6b] uppercase tracking-widest shrink-0"
        >
          Continue this story
        </h2>
        <div className="h-px flex-1 bg-[#e6e6e6]" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="continuation-content" className="sr-only">Continue the story</label>
        <textarea
          id="continuation-content"
          name="content"
          autoComplete="off"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full text-lg text-[#242424] placeholder-[#b3b3b3] bg-[#fafafa] border border-[#e6e6e6] rounded-sm p-4 focus:outline-none focus:border-[#242424] transition-colors resize-none leading-[1.8]"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
          placeholder="What happens next?"
        />
        {error && <p className="text-[#c94c4c] text-sm">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-6 py-2 bg-[#1a8917] text-white text-sm font-medium rounded-full hover:bg-[#157013] transition-colors disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Append'}
          </button>
        </div>
      </form>
    </div>
  )
}
