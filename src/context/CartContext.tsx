import { createContext, useContext, useState, ReactNode } from 'react';
import { Project } from '../data/projects';

interface CartContextType {
    cart: Project[];
    addToCart: (project: Project) => void;
    removeFromCart: (projectId: string) => void;
    isInCart: (projectId: string) => boolean;
    clearCart: () => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Project[]>([]);

    const addToCart = (project: Project) => {
        if (!isInCart(project.id)) {
            setCart((prev) => [...prev, project]);
        }
    };

    const removeFromCart = (projectId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== projectId));
    };

    const isInCart = (projectId: string) => {
        return cart.some((item) => item.id === projectId);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                isInCart,
                clearCart,
                cartCount: cart.length,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
