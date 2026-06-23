import Input from '@/components/atoms/Input'
import Textarea from '@/components/atoms/Textarea'
import { cn } from '@/lib/utils'

export default function FormField({ label, name, id, rows, className, inputClassName, ...props }) {
  const fieldId = id || name

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label htmlFor={fieldId} className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
          {label}
        </label>
      )}
      {rows ? (
        <Textarea id={fieldId} name={name} rows={rows} className={inputClassName} {...props} />
      ) : (
        <Input id={fieldId} name={name} className={inputClassName} {...props} />
      )}
    </div>
  )
}
