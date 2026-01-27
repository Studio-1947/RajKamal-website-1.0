import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Book } from '../types';

interface CartItem extends Book {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    isCartOpen: boolean;
    addToCart: (book: Book) => void;
    removeFromCart: (bookId: number) => void;
    toggleCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (book: Book) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === book.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === book.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...book, quantity: 1 }];
        });
        setIsCartOpen(true); // Open cart when item is added
    };

    const removeFromCart = (bookId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== bookId));
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            addToCart,
            removeFromCart,
            toggleCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
