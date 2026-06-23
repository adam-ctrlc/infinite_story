import { Badge as ShadBadge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const variantMap = {
  blue: 'bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/10',
  gray: 'bg-gray-800/80 border border-gray-700 text-gray-300 hover:bg-gray-800/80',
}

export default function Badge({ children, variant = 'blue', className }) {
  return (
    <ShadBadge
      variant="outline"
      className={cn(
        'rounded-full text-xs font-semibold uppercase tracking-wider',
        variantMap[variant],
        className
      )}
    >
      {children}
    </ShadBadge>
  )
}
