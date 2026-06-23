import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function wordCount(text) {
  const plain = stripHtml(text)
  return plain ? plain.trim().split(/\s+/).length : 0
}

export function readingTime(text) {
  const words = wordCount(text)
  const mins = Math.max(1, Math.ceil(words / 200))
  return `${mins} min read`
}
