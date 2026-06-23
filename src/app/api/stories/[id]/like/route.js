import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { toggleLike } from '@/lib/store'

export async function POST(request, { params }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const result = await toggleLike(id, userId)
  if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ likes: result.node.likes, liked: result.liked })
}
