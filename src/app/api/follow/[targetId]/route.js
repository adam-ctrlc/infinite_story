import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { isFollowing, toggleFollow, getFollowerCount } from '@/lib/store'

export async function GET(request, { params }) {
  const { userId } = await auth()
  const { targetId } = await params
  const [following, followerCount] = await Promise.all([
    userId ? isFollowing(userId, targetId) : Promise.resolve(false),
    getFollowerCount(targetId),
  ])
  return NextResponse.json({ following, followerCount })
}

export async function POST(request, { params }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { targetId } = await params
  if (targetId === userId) return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 })
  const following = await toggleFollow(userId, targetId)
  const followerCount = await getFollowerCount(targetId)
  return NextResponse.json({ following, followerCount })
}
