import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import type { ButtonProps } from '../../types';

/**
 * Button Component
 * 
 * A reusable button with multiple variants and sizes.
 * Uses forwardRef for proper ref handling.
 * 
 * @example
 * <Button variant="primary" size="lg" leftIcon={<Plus />}>
 *   Add Item
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        // Variant styles
        const variants = {
            primary: 'bg-black text-white hover:bg-gray-800 active:bg-gray-900',
            secondary: 'bg-gray-100 text-black hover:bg-gray-200 active:bg-gray-300',
            outline: 'border-2 border-black text-black hover:bg-black hover:text-white',
            ghost: 'text-gray-600 hover:text-black hover:bg-gray-100',
        };

        // Size styles
        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2.5 text-sm',
            lg: 'px-6 py-3 text-base',
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    // Base styles
                    'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    // Dynamic styles
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                    leftIcon
                )}
                {children}
                {!isLoading && rightIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
