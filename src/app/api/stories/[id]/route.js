import { NextResponse } from 'next/server'
import { getNodeById, getChildren, getAncestorChain } from '@/lib/store'
import { timeAgo } from '@/lib/utils'

function formatNode(node) {
  return { ...node, timestamp: timeAgo(node.createdAt) }
}

export async function GET(request, { params }) {
  const { id } = await params
  const [node, chain, children] = await Promise.all([
    getNodeById(id),
    getAncestorChain(id),
    getChildren(id),
  ])
  if (!node) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({
    node: formatNode(node),
    chain: chain.map(formatNode),
    children: children.map(formatNode),
  })
}
