import { cn } from '../../lib/utils';
import type { CardProps } from '../../types';

/**
 * Card Component
 * 
 * A versatile card container with optional hover effects.
 * 
 * @example
 * <Card hover padding="lg">
 *   <h3>Title</h3>
 *   <p>Content</p>
 * </Card>
 */
export default function Card({
    children,
    className,
    hover = false,
    padding = 'md',
}: CardProps) {
    const paddings = {
        none: '',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-6',
    };

    return (
        <div
            className={cn(
                'bg-white border border-gray-200 rounded-2xl transition-all duration-300',
                hover && 'hover:border-gray-300 hover:shadow-lg cursor-pointer',
                paddings[padding],
                className
            )}
        >
            {children}
        </div>
    );
}
