import { eq, isNull, desc, sql, and, or } from 'drizzle-orm'
import { db } from '@/lib/db'
import { nodes, nodeLikes, comments, commentLikes, ratings, follows, userSettings } from '@/lib/schema'
import { makeId } from '@/lib/utils'

// ── helpers ──────────────────────────────────────────────────────────────────

function rowToNode(row) {
  if (!row) return null
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    parentId: row.parentId,
    category: row.category,
    author: { id: row.authorId, name: row.authorName, imageUrl: row.authorImageUrl },
    likes: row.likes,
    createdAt: row.createdAt,
    visibility: row.visibility ?? 'public',
  }
}

function rowToComment(row) {
  if (!row) return null
  return {
    id: row.id,
    nodeId: row.nodeId,
    author: { id: row.authorId, name: row.authorName, imageUrl: row.authorImageUrl },
    content: row.content,
    likes: row.likes,
    createdAt: row.createdAt,
  }
}

// ── nodes ─────────────────────────────────────────────────────────────────────

export async function getTopLevelStories() {
  const rows = await db.select().from(nodes)
    .where(and(isNull(nodes.parentId), eq(nodes.visibility, 'public')))
    .orderBy(desc(nodes.createdAt))
  return rows.map(rowToNode)
}

// Returns only public top-level stories for a given author (used on public profile)
export async function getPublicStoriesByAuthor(authorId) {
  const rows = await db.select().from(nodes)
    .where(and(eq(nodes.authorId, authorId), isNull(nodes.parentId), eq(nodes.visibility, 'public')))
    .orderBy(desc(nodes.createdAt))
  return rows.map(rowToNode)
}

export async function getNodeById(id) {
  const [row] = await db.select().from(nodes).where(eq(nodes.id, id)).limit(1)
  return rowToNode(row)
}

export async function getChildren(parentId) {
  const rows = await db.select().from(nodes).where(eq(nodes.parentId, parentId))
  return rows.map(rowToNode)
}

export async function getAncestorChain(id) {
  // Walk up the tree iteratively
  const chain = []
  let current = await getNodeById(id)
  while (current) {
    chain.unshift(current)
    if (!current.parentId) break
    current = await getNodeById(current.parentId)
  }
  return chain
}

export async function getRootNode(id) {
  const chain = await getAncestorChain(id)
  return chain[0] || null
}

export async function addNode(data) {
  const isBranch = !!data.parentId
  const node = {
    id: makeId(),
    title: data.title ?? null,
    content: data.content,
    parentId: data.parentId ?? null,
    category: data.category ?? null,
    authorId: data.author?.id ?? 'anonymous',
    authorName: data.author?.name ?? 'Anonymous',
    authorImageUrl: data.author?.imageUrl ?? null,
    likes: 0,
    createdAt: new Date().toISOString(),
    visibility: isBranch ? 'public' : (data.visibility ?? 'public'),
  }
  await db.insert(nodes).values(node)
  return rowToNode(node)
}

export async function setStoryVisibility(nodeId, authorId, visibility) {
  await db.update(nodes)
    .set({ visibility })
    .where(and(eq(nodes.id, nodeId), eq(nodes.authorId, authorId), isNull(nodes.parentId)))
}

export async function toggleLike(nodeId, userId) {
  const existing = await db.select()
    .from(nodeLikes)
    .where(and(eq(nodeLikes.nodeId, nodeId), eq(nodeLikes.userId, userId)))
    .limit(1)

  if (existing.length) {
    await db.delete(nodeLikes).where(and(eq(nodeLikes.nodeId, nodeId), eq(nodeLikes.userId, userId)))
    await db.update(nodes).set({ likes: sql`${nodes.likes} - 1` }).where(eq(nodes.id, nodeId))
    const [row] = await db.select().from(nodes).where(eq(nodes.id, nodeId)).limit(1)
    return { node: rowToNode(row), liked: false }
  } else {
    await db.insert(nodeLikes).values({ nodeId, userId })
    await db.update(nodes).set({ likes: sql`${nodes.likes} + 1` }).where(eq(nodes.id, nodeId))
    const [row] = await db.select().from(nodes).where(eq(nodes.id, nodeId)).limit(1)
    return { node: rowToNode(row), liked: true }
  }
}

export async function getStoriesByAuthor(authorId) {
  const rows = await db.select().from(nodes).where(eq(nodes.authorId, authorId)).orderBy(desc(nodes.createdAt))
  return rows.map(rowToNode)
}

export async function getLikedByUser(userId) {
  const rows = await db
    .select({ node: nodes })
    .from(nodeLikes)
    .innerJoin(nodes, eq(nodeLikes.nodeId, nodes.id))
    .where(eq(nodeLikes.userId, userId))
    .orderBy(desc(nodes.createdAt))
  return rows.map((r) => rowToNode(r.node))
}

// ── comments ──────────────────────────────────────────────────────────────────

export async function getCommentCount(nodeId) {
  const [row] = await db.select({ count: sql`count(*)` }).from(comments).where(eq(comments.nodeId, nodeId))
  return Number(row?.count ?? 0)
}

export async function getComments(nodeId) {
  const rows = await db.select().from(comments).where(eq(comments.nodeId, nodeId)).orderBy(comments.createdAt)
  return rows.map(rowToComment)
}

export async function addComment(nodeId, data) {
  const comment = {
    id: makeId(),
    nodeId,
    authorId: data.author?.id ?? 'anonymous',
    authorName: data.author?.name ?? 'Anonymous',
    authorImageUrl: data.author?.imageUrl ?? null,
    content: data.content,
    likes: 0,
    createdAt: new Date().toISOString(),
  }
  await db.insert(comments).values(comment)
  return rowToComment(comment)
}

export async function toggleCommentLike(commentId, userId) {
  const existing = await db.select()
    .from(commentLikes)
    .where(and(eq(commentLikes.commentId, commentId), eq(commentLikes.userId, userId)))
    .limit(1)

  if (existing.length) {
    await db.delete(commentLikes).where(and(eq(commentLikes.commentId, commentId), eq(commentLikes.userId, userId)))
    await db.update(comments).set({ likes: sql`${comments.likes} - 1` }).where(eq(comments.id, commentId))
  } else {
    await db.insert(commentLikes).values({ commentId, userId })
    await db.update(comments).set({ likes: sql`${comments.likes} + 1` }).where(eq(comments.id, commentId))
  }
  const [row] = await db.select().from(comments).where(eq(comments.id, commentId)).limit(1)
  return rowToComment(row)
}

// ── ratings ───────────────────────────────────────────────────────────────────

export async function getRatingData(nodeId) {
  const [row] = await db
    .select({ avg: sql`avg(${ratings.rating})`, count: sql`count(*)` })
    .from(ratings)
    .where(eq(ratings.nodeId, nodeId))
  const count = Number(row?.count ?? 0)
  const average = count ? Math.round(Number(row.avg) * 10) / 10 : 0
  return { average, count }
}

export async function getUserRating(nodeId, userId) {
  const [row] = await db.select().from(ratings).where(and(eq(ratings.nodeId, nodeId), eq(ratings.userId, userId))).limit(1)
  return row?.rating ?? 0
}

export async function setRating(nodeId, userId, rating) {
  await db.insert(ratings).values({ nodeId, userId, rating }).onConflictDoUpdate({
    target: [ratings.nodeId, ratings.userId],
    set: { rating },
  })
  return getRatingData(nodeId)
}

// ── follows ───────────────────────────────────────────────────────────────────

export async function isFollowing(followerId, targetId) {
  const [row] = await db.select()
    .from(follows)
    .where(and(eq(follows.followerId, followerId), eq(follows.targetId, targetId)))
    .limit(1)
  return !!row
}

export async function toggleFollow(followerId, targetId) {
  const already = await isFollowing(followerId, targetId)
  if (already) {
    await db.delete(follows).where(and(eq(follows.followerId, followerId), eq(follows.targetId, targetId)))
    return false
  } else {
    await db.insert(follows).values({ followerId, targetId })
    return true
  }
}

export async function getFollowingIds(userId) {
  const rows = await db.select({ targetId: follows.targetId }).from(follows).where(eq(follows.followerId, userId))
  return rows.map((r) => r.targetId)
}

export async function getFollowerIds(userId) {
  const rows = await db.select({ followerId: follows.followerId }).from(follows).where(eq(follows.targetId, userId))
  return rows.map((r) => r.followerId)
}

export async function getFollowerCount(userId) {
  const [row] = await db.select({ count: sql`count(*)` }).from(follows).where(eq(follows.targetId, userId))
  return Number(row?.count ?? 0)
}

export async function getFollowingCount(userId) {
  const [row] = await db.select({ count: sql`count(*)` }).from(follows).where(eq(follows.followerId, userId))
  return Number(row?.count ?? 0)
}

export async function getUserInfo(userId) {
  const [row] = await db.select().from(nodes).where(eq(nodes.authorId, userId)).limit(1)
  if (!row) return { id: userId, name: userId, imageUrl: null }
  return { id: row.authorId, name: row.authorName, imageUrl: row.authorImageUrl }
}

export async function getStoriesFromFollowing(userId) {
  const ids = await getFollowingIds(userId)
  if (!ids.length) return []
  const rows = await db.select().from(nodes)
    .where(and(
      isNull(nodes.parentId),
      eq(nodes.visibility, 'public'),
      sql`${nodes.authorId} IN (${sql.join(ids.map((id) => sql`${id}`), sql`, `)})`,
    ))
    .orderBy(desc(nodes.createdAt))
  return rows.map(rowToNode)
}

// ── user settings ─────────────────────────────────────────────────────────────

export async function getUserSettings(userId) {
  const [row] = await db.select().from(userSettings).where(eq(userSettings.userId, userId)).limit(1)
  return row ?? { userId, hideFollowers: false, hideFollowing: false }
}

export async function setUserSettings(userId, patch) {
  await db.insert(userSettings).values({ userId, ...patch }).onConflictDoUpdate({
    target: [userSettings.userId],
    set: patch,
  })
}
