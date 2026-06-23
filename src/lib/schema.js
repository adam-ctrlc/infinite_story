import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'

export const nodes = sqliteTable('nodes', {
  id: text('id').primaryKey(),
  title: text('title'),
  content: text('content').notNull(),
  parentId: text('parent_id'),
  category: text('category'),
  authorId: text('author_id').notNull(),
  authorName: text('author_name').notNull(),
  authorImageUrl: text('author_image_url'),
  likes: integer('likes').default(0).notNull(),
  createdAt: text('created_at').notNull(),
  // 'public' | 'private' — branches always treated as public regardless of value
  visibility: text('visibility').default('public').notNull(),
})

// Per-user privacy preferences
export const userSettings = sqliteTable('user_settings', {
  userId: text('user_id').primaryKey(),
  hideFollowers: integer('hide_followers', { mode: 'boolean' }).default(false).notNull(),
  hideFollowing: integer('hide_following', { mode: 'boolean' }).default(false).notNull(),
})

export const nodeLikes = sqliteTable('node_likes', {
  nodeId: text('node_id').notNull(),
  userId: text('user_id').notNull(),
}, (t) => [primaryKey({ columns: [t.nodeId, t.userId] })])

export const comments = sqliteTable('comments', {
  id: text('id').primaryKey(),
  nodeId: text('node_id').notNull(),
  authorId: text('author_id').notNull(),
  authorName: text('author_name').notNull(),
  authorImageUrl: text('author_image_url'),
  content: text('content').notNull(),
  likes: integer('likes').default(0).notNull(),
  createdAt: text('created_at').notNull(),
})

export const commentLikes = sqliteTable('comment_likes', {
  commentId: text('comment_id').notNull(),
  userId: text('user_id').notNull(),
}, (t) => [primaryKey({ columns: [t.commentId, t.userId] })])

export const ratings = sqliteTable('ratings', {
  nodeId: text('node_id').notNull(),
  userId: text('user_id').notNull(),
  rating: integer('rating').notNull(),
}, (t) => [primaryKey({ columns: [t.nodeId, t.userId] })])

export const follows = sqliteTable('follows', {
  followerId: text('follower_id').notNull(),
  targetId: text('target_id').notNull(),
}, (t) => [primaryKey({ columns: [t.followerId, t.targetId] })])
