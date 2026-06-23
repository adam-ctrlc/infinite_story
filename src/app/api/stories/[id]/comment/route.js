import { auth } from '@clerk/nextjs/server'
import { getComments, addComment } from '@/lib/store'
import { timeAgo } from '@/lib/utils'

export async function GET(_, { params }) {
  const { id } = await params
  const raw = await getComments(id)
  return Response.json(raw.map((c) => ({ ...c, timestamp: timeAgo(c.createdAt) })))
}

export async function POST(req, { params }) {
  const { userId } = await auth()
  const { id } = await params
  const body = await req.json()
  const comment = await addComment(id, { author: body.author, content: body.content })
  return Response.json({ ...comment, timestamp: timeAgo(comment.createdAt) })
}
