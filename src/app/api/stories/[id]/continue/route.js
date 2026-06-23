import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getNodeById, addNode, getRootNode } from '@/lib/store'
import { timeAgo } from '@/lib/utils'

export async function POST(request, { params }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const parent = await getNodeById(id)
  if (!parent) return NextResponse.json({ error: 'Story not found' }, { status: 404 })

  const body = await request.json()
  const { content, author } = body

  if (!content?.trim()) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 })
  }

  const root = await getRootNode(id)
  const node = await addNode({
    title: null,
    content: content.trim(),
    parentId: id,
    category: root?.category || parent.category,
    author,
  })

  return NextResponse.json({ ...node, timestamp: timeAgo(node.createdAt) }, { status: 201 })
}
