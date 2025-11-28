import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/helpers';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-bold transition-opacity rounded-md focus:outline-none text-center';
    
    const variants = {
      primary: 'bg-(--sbl-pink) text-white hover:opacity-90 focus:ring-(--sbl-pink)',
      secondary: 'bg-(--pale-gray) text-(--font-color) hover:bg-(--soft-gray) focus:ring-(--medium-gray)',
      outline: 'border border-(--soft-gray) bg-transparent text-(--font-color) hover:bg-(--light-gray) focus:ring-(--sbl-pink)',
      ghost: 'bg-transparent text-(--font-color) hover:bg-(--light-gray) focus:ring-(--sbl-pink)',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            처리 중...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

