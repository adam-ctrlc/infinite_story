import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { setStoryVisibility, getNodeById } from '@/lib/store'

export async function PATCH(request, { params }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const node = await getNodeById(id)
  if (!node) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (node.author?.id !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  if (node.parentId) return NextResponse.json({ error: 'Branches are always public' }, { status: 400 })

  const { visibility } = await request.json()
  if (visibility !== 'public' && visibility !== 'private') {
    return NextResponse.json({ error: 'Invalid visibility' }, { status: 400 })
  }

  await setStoryVisibility(id, userId, visibility)
  return NextResponse.json({ ok: true, visibility })
}
