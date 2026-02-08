import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
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
    const [cart, setCart] = useState<Project[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = useCallback((project: Project) => {
        setCart((prev) => {
            if (prev.some((item) => item.id === project.id)) return prev;
            return [...prev, project];
        });
    }, []);

    const removeFromCart = useCallback((projectId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== projectId));
    }, []);

    const isInCart = useCallback((projectId: string) => {
        return cart.some((item) => item.id === projectId);
    }, [cart]);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const value = useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        isInCart,
        clearCart,
        cartCount: cart.length,
    }), [cart, addToCart, removeFromCart, isInCart, clearCart]);

    return (
        <CartContext.Provider
            value={value}
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
