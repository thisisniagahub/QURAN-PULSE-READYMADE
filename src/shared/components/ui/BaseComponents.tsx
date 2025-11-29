import React from 'react'
import { motion } from 'framer-motion'
import { X, Loader2, Check, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
          {
            'bg-brand-primary text-white hover:bg-opacity-90': variant === 'primary',
            'bg-brand-secondary text-black hover:bg-opacity-90': variant === 'secondary',
            'border border-brand-primary bg-transparent text-brand-primary hover:bg-brand-primary hover:text-white': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'text-brand-primary underline-offset-4 hover:underline': variant === 'link',
          },
          {
            'h-9 px-4 py-2 text-sm': size === 'sm',
            'h-10 px-6 py-2': size === 'md',
            'h-12 px-8 py-3 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
        disabled={props.disabled || loading}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      'rounded-xl border bg-card text-card-foreground shadow glass',
      className
    )}
    {...props}
  />
)
Card.displayName = 'Card'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 glass',
            error && 'border-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  required?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 glass',
            error && 'border-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  required?: boolean
  options: { value: string; label: string }[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, required, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <select
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 glass',
            error && 'border-red-500',
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'

interface AlertProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  title?: string
  description?: string
  className?: string
  onClose?: () => void
}

export const Alert = ({ variant = 'default', title, description, className, onClose }: AlertProps) => {
  const variantConfig = {
    default: { icon: Info, color: 'text-foreground' },
    success: { icon: Check, color: 'text-green-500' },
    warning: { icon: AlertTriangle, color: 'text-yellow-500' },
    error: { icon: AlertCircle, color: 'text-red-500' },
    info: { icon: Info, color: 'text-blue-500' },
  }

  const { icon: Icon, color } = variantConfig[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'relative rounded-lg border p-4 mb-4 glass',
        variant === 'success' && 'border-green-500/30 bg-green-500/10',
        variant === 'warning' && 'border-yellow-500/30 bg-yellow-500/10',
        variant === 'error' && 'border-red-500/30 bg-red-500/10',
        variant === 'info' && 'border-blue-500/30 bg-blue-500/10',
        className
      )}
    >
      <div className="flex items-start">
        <Icon className={cn('h-5 w-5 mr-3', color)} />
        <div className="flex-1">
          {title && <h5 className="font-medium">{title}</h5>}
          {description && <p className="text-sm mt-1">{description}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-foreground/70 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </motion.div>
  )
}