import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-xl border-2 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200 text-gray-800",
        success: "bg-green-50 border-green-200 text-green-800",
        error: "bg-red-50 border-red-200 text-red-800",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        info: "bg-blue-50 border-blue-200 text-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const icons = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const Alert = React.forwardRef(({ className, variant, children, onClose, ...props }, ref) => {
  const Icon = icons[variant] || icons.default
  return (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      <Icon className="h-5 w-5" />
      <div className="ml-7">{children}</div>
      {onClose && (
        <button onClick={onClose} className="absolute right-3 top-3 opacity-50 hover:opacity-100">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn("mb-1 font-semibold leading-none tracking-tight", className)} {...props} />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }