import { auth } from '@clerk/nextjs/server'
import { setRating, getRatingData, getUserRating } from '@/lib/store'

export async function GET(_, { params }) {
  const { userId } = await auth()
  const { id } = await params
  const [ratingData, userRating] = await Promise.all([
    getRatingData(id),
    userId ? getUserRating(id, userId) : Promise.resolve(0),
  ])
  return Response.json({ ...ratingData, userRating })
}

export async function POST(req, { params }) {
  const { userId } = await auth()
  const { id } = await params
  const { rating } = await req.json()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await setRating(id, userId, rating)
  return Response.json({ ...data, userRating: rating })
}
