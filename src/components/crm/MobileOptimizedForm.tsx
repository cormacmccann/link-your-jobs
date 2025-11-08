import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MobileOptimizedFormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export function MobileOptimizedForm({ children, onSubmit, className }: MobileOptimizedFormProps) {
  return (
    <form 
      onSubmit={onSubmit} 
      className={cn(
        "space-y-6 animate-fade-in",
        className
      )}
    >
      {children}
    </form>
  );
}

interface MobileFormFieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}

export function MobileFormField({ label, children, required, className }: MobileFormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

interface MobileFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function MobileFormInput({ error, className, ...props }: MobileFormInputProps) {
  return (
    <div className="space-y-1">
      <input
        className={cn(
          "flex h-12 w-full rounded-xl border border-input bg-background px-4 py-3 text-base md:text-sm",
          "ring-offset-background transition-all duration-200",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "touch-manipulation",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
}

interface MobileFormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export function MobileFormTextarea({ error, className, ...props }: MobileFormTextareaProps) {
  return (
    <div className="space-y-1">
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-input bg-background px-4 py-3 text-base md:text-sm",
          "ring-offset-background transition-all duration-200",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "touch-manipulation resize-none",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
}

interface MobileFormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
}

export function MobileFormButton({ 
  variant = "primary", 
  loading, 
  children, 
  className,
  disabled,
  ...props 
}: MobileFormButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-medium",
        "ring-offset-background transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "h-12 px-6 py-3 w-full",
        "touch-manipulation active:scale-[0.98]",
        variants[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}