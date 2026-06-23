'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

export default function StarRating({ value = 0, onChange, readonly = false, size = 20 }) {
  const [hovered, setHovered] = useState(0)

  const display = hovered || value

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={readonly ? 'cursor-default' : 'cursor-pointer'}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={size}
            className={`transition-colors ${
              star <= display
                ? 'text-[#f59e0b] fill-[#f59e0b]'
                : 'text-[#e6e6e6] fill-[#e6e6e6]'
            } ${!readonly && star <= (hovered || 0) ? 'text-[#f59e0b] fill-[#f59e0b]' : ''}`}
          />
        </button>
      ))}
    </div>
  )
}
