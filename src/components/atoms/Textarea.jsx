import { Textarea as ShadTextarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export default function Textarea({ className, ...props }) {
  return (
    <ShadTextarea
      className={cn(
        'w-full bg-gray-950/50 border-gray-800 text-gray-100 rounded-xl p-5',
        'placeholder:text-gray-700 focus-visible:ring-blue-500/50 focus-visible:border-blue-500 resize-none leading-relaxed',
        className
      )}
      {...props}
    />
  )
}
