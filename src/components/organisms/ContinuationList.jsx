import { getChildren, getCommentCount } from '@/lib/store'
import ContinuationCard from '@/components/molecules/ContinuationCard'

export default async function ContinuationList({ nodes }) {
  if (!nodes || nodes.length === 0) return null

  const enriched = await Promise.all(
    nodes.map(async (node) => ({
      ...node,
      commentCount: await getCommentCount(node.id),
      branchCount: (await getChildren(node.id)).length,
    }))
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {enriched.map((node) => (
        <ContinuationCard key={node.id} node={node} />
      ))}
    </div>
  )
}
