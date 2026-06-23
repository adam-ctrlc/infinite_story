import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getUserSettings, setUserSettings } from '@/lib/store'

export async function GET(request, { params }) {
  const { userId } = await auth()
  const { userId: targetId } = await params
  if (!userId || userId !== targetId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const settings = await getUserSettings(userId)
  return NextResponse.json(settings)
}

export async function PATCH(request, { params }) {
  const { userId } = await auth()
  const { userId: targetId } = await params
  if (!userId || userId !== targetId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const patch = {}
  if (typeof body.hideFollowers === 'boolean') patch.hideFollowers = body.hideFollowers
  if (typeof body.hideFollowing === 'boolean') patch.hideFollowing = body.hideFollowing
  await setUserSettings(userId, patch)
  return NextResponse.json({ ok: true })
}
