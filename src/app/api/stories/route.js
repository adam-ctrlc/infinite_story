import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getTopLevelStories, addNode, getStoriesByAuthor, getCommentCount, getChildren, getRatingData, getStoriesFromFollowing } from '@/lib/store'
import { timeAgo, readingTime, stripHtml } from '@/lib/utils'

async function formatNode(node) {
  const plain = stripHtml(node.content)
  const [commentCount, branchCount, rating] = await Promise.all([
    getCommentCount(node.id),
    getChildren(node.id).then((c) => c.length),
    getRatingData(node.id),
  ])
  return {
    ...node,
    timestamp: timeAgo(node.createdAt),
    readTime: readingTime(node.content),
    commentCount,
    branchCount,
    ratingAverage: rating.average,
    ratingCount: rating.count,
    snippet: plain.slice(0, 220) + (plain.length > 220 ? '…' : ''),
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const authorId = searchParams.get('authorId')
  const following = searchParams.get('following')

  let raw
  if (following) {
    const { userId } = await auth()
    raw = userId ? await getStoriesFromFollowing(userId) : []
  } else if (authorId) {
    raw = await getStoriesByAuthor(authorId)
  } else {
    raw = await getTopLevelStories()
  }

  const stories = await Promise.all(raw.map(formatNode))
  return NextResponse.json(stories)
}

export async function POST(request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, content, category, author } = body

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
  }

  const node = await addNode({ title: title.trim(), content: content.trim(), category, parentId: null, author })
  return NextResponse.json({ ...node, timestamp: timeAgo(node.createdAt) }, { status: 201 })
}
