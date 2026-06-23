'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import CommentCard from '@/components/molecules/CommentCard'
import Avatar from '@/components/atoms/Avatar'

export default function CommentSection({ nodeId }) {
  const { user } = useUser()
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/stories/${nodeId}/comment`)
      .then((r) => r.json())
      .then(setComments)
  }, [nodeId])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)
    const res = await fetch(`/api/stories/${nodeId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: content.trim(),
        author: {
          id: user?.id || 'anon',
          name: user?.username || user?.firstName || 'Anonymous',
          imageUrl: user?.imageUrl || null,
        },
      }),
    })
    if (res.ok) {
      const newComment = await res.json()
      setComments((prev) => [...prev, newComment])
      setContent('')
    }
    setLoading(false)
  }

  const name = user?.username || user?.firstName || 'You'

  return (
    <div id="comments" className="mt-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-[#e6e6e6]" />
        <h2 className="text-xs font-bold text-[#6b6b6b] uppercase tracking-widest shrink-0">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h2>
        <div className="h-px flex-1 bg-[#e6e6e6]" />
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-8 pb-8 border-b border-[#e6e6e6]">
        <Avatar name={name} imageUrl={user?.imageUrl || null} size="sm" className="shrink-0 mt-1" />
        <div className="flex-1">
          <label htmlFor="comment-input" className="sr-only">Write a comment</label>
          <textarea
            id="comment-input"
            name="comment"
            autoComplete="off"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            placeholder="What did you think?"
            className="w-full text-sm text-[#242424] placeholder-[#b3b3b3] bg-[#fafafa] border border-[#e6e6e6] rounded-sm p-3 focus:outline-none focus:border-[#242424] transition-colors resize-none leading-relaxed"
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="px-5 py-1.5 bg-[#242424] text-white text-xs font-medium rounded-full hover:bg-[#3d3d3d] transition-colors disabled:opacity-40"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </form>

      {/* Comment list */}
      {comments.length === 0 ? (
        <p className="text-sm text-[#6b6b6b] py-4">No comments yet. Be the first to share your thoughts.</p>
      ) : (
        <div>
          {comments.map((c) => (
            <CommentCard key={c.id} comment={c} />
          ))}
        </div>
      )}
    </div>
  )
}
