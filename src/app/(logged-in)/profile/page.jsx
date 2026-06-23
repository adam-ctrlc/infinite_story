import { currentUser } from '@clerk/nextjs/server'
import {
  getStoriesByAuthor, getLikedByUser, getCommentCount, getChildren,
  getFollowerCount, getFollowingCount, getFollowerIds, getFollowingIds, getUserInfo,
} from '@/lib/store'
import { timeAgo, readingTime, stripHtml } from '@/lib/utils'
import ProfileHeader from '@/components/organisms/ProfileHeader'
import ProfileSettings from '@/components/organisms/ProfileSettings'
import ProfileTabs from '@/components/organisms/ProfileTabs'

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
    snippet: plain.slice(0, 200) + (plain.length > 200 ? '…' : ''),
  }
}

export default async function ProfilePage() {
  const user = await currentUser()

  const [userNodes, likedRaw, followerIds, followingIds] = await Promise.all([
    user ? getStoriesByAuthor(user.id) : Promise.resolve([]),
    user ? getLikedByUser(user.id) : Promise.resolve([]),
    user ? getFollowerIds(user.id) : Promise.resolve([]),
    user ? getFollowingIds(user.id) : Promise.resolve([]),
  ])

  const [enrichedNodes, liked] = await Promise.all([
    Promise.all(userNodes.map(enrichNode)),
    Promise.all(likedRaw.map(enrichNode)),
  ])

  const stories = enrichedNodes.filter((n) => !n.parentId)
  const branches = enrichedNodes.filter((n) => !!n.parentId)

  const [followers, following] = await Promise.all([
    Promise.all(followerIds.map(getUserInfo)),
    Promise.all(followingIds.map(getUserInfo)),
  ])

  const totalLikes = enrichedNodes.reduce((acc, n) => acc + (n.likes || 0), 0)

  const stats = [
    { label: 'Stories', value: stories.length, tab: 'Stories' },
    { label: 'Branches', value: branches.length, tab: 'Branches' },
    { label: 'Likes', value: totalLikes, tab: 'Likes' },
    { label: 'Followers', value: followerIds.length, tab: 'Followers' },
    { label: 'Following', value: followingIds.length, tab: 'Following' },
  ]

  return (
    <div className="min-h-screen bg-white pt-14">
      <ProfileHeader user={user} stats={stats} />
      <ProfileSettings />
      <div className="border-t border-[#e6e6e6]">
        <ProfileTabs stories={stories} branches={branches} liked={liked} followers={followers} following={following} />
      </div>
    </div>
  )
}
