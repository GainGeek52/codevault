import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import type { InputProps } from '../../types';

/**
 * Input Component
 * 
 * A reusable input field with label, error state, and icon support.
 * Uses forwardRef for form library compatibility (react-hook-form, etc.)
 * 
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   error={errors.email?.message}
 *   leftIcon={<Mail />}
 *   {...register('email')}
 * />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, leftIcon, className, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="space-y-2">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-black"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            // Base styles
                            'w-full px-4 py-3 bg-white border rounded-xl transition-all duration-200',
                            'placeholder:text-gray-400',
                            'focus:outline-none focus:ring-2 focus:ring-offset-0',
                            // Conditional styles
                            leftIcon && 'pl-12',
                            error
                                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                                : 'border-gray-200 focus:border-gray-400 focus:ring-gray-100',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-sm text-red-500 animate-fade-in">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
