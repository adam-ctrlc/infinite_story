import { cn } from '@/lib/utils'

export default function CategoryPill({ children, active, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
        active
          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white',
        className
      )}
    >
      {children}
    </button>
  )
}
