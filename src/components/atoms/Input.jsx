import { Input as ShadInput } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function Input({ className, ...props }) {
  return (
    <ShadInput
      className={cn(
        'h-auto w-full bg-gray-950/50 border-gray-800 text-gray-200 font-medium rounded-xl p-4',
        'placeholder:text-gray-700 focus-visible:ring-blue-500/50 focus-visible:border-blue-500',
        className
      )}
      {...props}
    />
  )
}
