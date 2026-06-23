import { Avatar as ShadAvatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const sizeMap = {
  xs: 'size-5 text-[10px]',
  sm: 'size-7 text-xs',
  md: 'size-10 text-base',
  lg: 'size-16 text-2xl',
  xl: 'size-24 text-3xl',
  '2xl': 'size-36 text-4xl',
}

export default function Avatar({ name, imageUrl, size = 'md', className }) {
  const initial = name ? name[0].toUpperCase() : '?'
  const sizeClass = sizeMap[size] || sizeMap.md

  return (
    <ShadAvatar className={cn('flex-shrink-0', sizeClass, className)}>
      {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
      <AvatarFallback
        className="bg-[#242424] text-white font-bold rounded-full"
        style={{ fontSize: 'inherit' }}
      >
        {initial}
      </AvatarFallback>
    </ShadAvatar>
  )
}
