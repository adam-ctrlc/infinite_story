import { auth } from '@clerk/nextjs/server'
import { toggleCommentLike } from '@/lib/store'

export async function POST(_, { params }) {
  const { userId } = await auth()
  const { commentId } = await params
  const comment = await toggleCommentLike(commentId, userId || 'anon')
  if (!comment) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json({ likes: comment.likes })
}
