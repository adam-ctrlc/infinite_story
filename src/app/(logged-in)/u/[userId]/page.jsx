import { auth } from '@clerk/nextjs/server'
import {
  getPublicStoriesByAuthor, getChildren, getCommentCount,
  getFollowerCount, getFollowingCount, getUserInfo, getUserSettings,
  isFollowing as checkIsFollowing,
} from '@/lib/store'
import { timeAgo, readingTime, stripHtml } from '@/lib/utils'
import Avatar from '@/components/atoms/Avatar'
import PublicProfileTabs from '@/components/organisms/PublicProfileTabs'
import PublicFollowButton from '@/components/atoms/PublicFollowButton'

async function enrichNode(node) {
  const plain = stripHtml(node.content)
  const [commentCount, children] = await Promise.all([
    getCommentCount(node.id),
    getChildren(node.id),
  ])
  return {
    ...node,
    timestamp: timeAgo(node.createdAt),
    readTime: readingTime(node.content),
    commentCount,
    branchCount: children.length,
    snippet: plain.slice(0, 220) + (plain.length > 220 ? '…' : ''),
  }
}

export default async function PublicProfilePage({ params }) {
  const { userId } = await params
  const { userId: viewerId } = await auth()

  if (viewerId && viewerId === userId) {
    const { redirect } = await import('next/navigation')
    redirect('/profile')
  }

  const [userInfo, rawStories, settings, followerCount, followingCount, alreadyFollowing] = await Promise.all([
    getUserInfo(userId),
    getPublicStoriesByAuthor(userId),
    getUserSettings(userId),
    getFollowerCount(userId),
    getFollowingCount(userId),
    viewerId ? checkIsFollowing(viewerId, userId) : Promise.resolve(false),
  ])

  const stories = await Promise.all(rawStories.map(enrichNode))

  return (
    <div className="min-h-screen bg-white pt-14">
      {/* Header */}
      <div className="border-b border-[#e6e6e6] py-12 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar name={userInfo.name} imageUrl={userInfo.imageUrl} size="xl" />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-[#242424] mb-1">{userInfo.name}</h1>
            <p className="text-sm text-[#6b6b6b] mb-4">@{userInfo.name?.toLowerCase().replace(/\s+/g, '')}</p>
            <div className="flex items-center justify-center sm:justify-start gap-6 text-sm text-[#6b6b6b] mb-5">
              <span><strong className="text-[#242424]">{stories.length}</strong> stories</span>
              {!settings.hideFollowers && (
                <span><strong className="text-[#242424]">{followerCount}</strong> followers</span>
              )}
              {!settings.hideFollowing && (
                <span><strong className="text-[#242424]">{followingCount}</strong> following</span>
              )}
            </div>
            {viewerId && viewerId !== userId && (
              <PublicFollowButton targetId={userId} initialFollowing={alreadyFollowing} initialCount={followerCount} hideCount={settings.hideFollowers} />
            )}
          </div>
        </div>
      </div>

      {/* Stories */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <PublicProfileTabs stories={stories} />
      </div>
    </div>
  )
}
