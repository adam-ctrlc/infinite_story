import Link from 'next/link'
import { getNodeById, getChildren, getAncestorChain, getComments } from '@/lib/store'
import { timeAgo, readingTime, wordCount } from '@/lib/utils'
import ContinuationList from '@/components/organisms/ContinuationList'
import ContinuationForm from '@/components/organisms/ContinuationForm'
import ReactionBar from '@/components/organisms/ReactionBar'
import CommentSection from '@/components/organisms/CommentSection'
import AuthorInfo from '@/components/molecules/AuthorInfo'
import StoryExportMenu from '@/components/molecules/StoryExportMenu'
import StoryThread from '@/components/molecules/StoryThread'
import FollowButton from '@/components/atoms/FollowButton'

function formatNode(node) {
  return { ...node, timestamp: timeAgo(node.createdAt) }
}

export default async function Page({ params }) {
  const { id } = await params
  const [raw, chainRaw, childrenRaw, comments] = await Promise.all([
    getNodeById(id),
    getAncestorChain(id),
    getChildren(id),
    getComments(id),
  ])

  if (!raw) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#6b6b6b]">Story not found.</p>
      </div>
    )
  }

  const node = formatNode(raw)
  const chain = chainRaw.map(formatNode)
  const children = childrenRaw.map(formatNode)
  const isContinuation = !!node.parentId

  return (
    <div className="min-h-screen bg-white pt-14">
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-24">

        {/* Breadcrumb chain for continuations */}
        {isContinuation && <StoryThread ancestors={chain.slice(0, -1)} />}

        {/* Title */}
        {node.title && (
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1
              className="text-4xl md:text-5xl font-bold text-[#242424] leading-tight flex-1"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {node.title}
            </h1>
            <StoryExportMenu title={node.title} content={node.content} author={node.author} />
          </div>
        )}

        {/* Author + meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-8 border-b border-[#e6e6e6]">
          <AuthorInfo
            author={node.author}
            timestamp={node.timestamp}
            label={isContinuation ? 'Continued by' : 'By'}
          />
          <FollowButton targetId={node.author?.id} targetName={node.author?.name} />
          <div className="flex items-center gap-3 ml-auto text-xs text-[#6b6b6b] shrink-0">
            <span>{wordCount(node.content).toLocaleString()} words</span>
            <span className="text-[#e6e6e6]">|</span>
            <span>{readingTime(node.content)}</span>
            {node.category && (
              <>
                <span className="text-[#e6e6e6]">|</span>
                <span className="bg-[#f2f2f2] px-3 py-1 rounded-full font-medium">{node.category}</span>
              </>
            )}
          </div>
        </div>

        {/* Story body */}
        {node.content?.startsWith('<') ? (
          <div
            className="story-content mb-4"
            dangerouslySetInnerHTML={{ __html: node.content }}
          />
        ) : (
          <div
            className="text-xl text-[#242424] leading-[1.9] mb-4"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
          >
            {node.content}
          </div>
        )}

        {/* Reactions: likes, comments scroll, star rating */}
        <ReactionBar nodeId={id} initialLikes={node.likes} commentCount={comments.length} readTime={readingTime(node.content)} />

        {/* Continuations */}
        {children.length > 0 && (
          <div className="mb-12">
            <p className="text-xs font-bold text-[#6b6b6b] uppercase tracking-widest mb-6">
              {children.length} {children.length === 1 ? 'continuation' : 'continuations'}
            </p>
            <ContinuationList nodes={children} />
          </div>
        )}

        {/* Add continuation */}
        <ContinuationForm nodeId={id} />

        {/* Comments */}
        <CommentSection nodeId={id} />

        {/* Start new */}
        <div className="mt-16 pt-8 border-t border-[#e6e6e6] flex items-center justify-between">
          <p className="text-sm text-[#6b6b6b]">Want to start something new?</p>
          <Link
            href="/story"
            className="px-5 py-2 border border-[#e6e6e6] rounded-full text-sm text-[#242424] hover:border-[#242424] transition-colors font-medium"
          >
            New story
          </Link>
        </div>
      </div>
    </div>
  )
}
