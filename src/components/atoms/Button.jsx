// Thin wrapper around shadcn Button with app-specific variant aliases
import { Button as ShadButton, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const variantMap = {
  primary: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-900/20 border-0',
  secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 hover:border-gray-600',
  ghost: 'text-gray-400 hover:text-white hover:bg-gray-800 border-0',
  white: 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] border-0',
  danger: 'text-gray-300 hover:text-red-400 hover:bg-gray-800 border-0',
}

const sizeMap = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
}

export default function Button({ children, variant = 'primary', size = 'md', className, ...props }) {
  return (
    <ShadButton
      variant="ghost"
      size={sizeMap[size] || 'default'}
      className={cn(
        'rounded-xl font-bold active:scale-95',
        variantMap[variant],
        className
      )}
      {...props}
    >
      {children}
    </ShadButton>
  )
}

export { buttonVariants }
