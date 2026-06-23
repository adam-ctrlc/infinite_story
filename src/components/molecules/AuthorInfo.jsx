import Link from 'next/link'
import { Dot } from 'lucide-react'
import Avatar from '@/components/atoms/Avatar'

export default function AuthorInfo({ author, timestamp, label = 'By' }) {
  const name = typeof author === 'string' ? author : author?.name
  const imageUrl = typeof author === 'object' ? author?.imageUrl : null
  const authorId = typeof author === 'object' ? author?.id : null

  const nameEl = authorId ? (
    <Link href={`/u/${authorId}`} className="font-medium text-[#242424] hover:underline">{name}</Link>
  ) : (
    <span className="font-medium text-[#242424]">{name}</span>
  )

  return (
    <div className="flex items-center gap-2.5">
      {authorId ? (
        <Link href={`/u/${authorId}`}>
          <Avatar name={name} imageUrl={imageUrl} size="sm" />
        </Link>
      ) : (
        <Avatar name={name} imageUrl={imageUrl} size="sm" />
      )}
      <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
        {label && <span>{label}</span>}
        {nameEl}
        {timestamp && (
          <>
            <Dot size={14} className="text-[#6b6b6b] shrink-0" />
            <span>{timestamp}</span>
          </>
        )}
      </div>
    </div>
  )
}
