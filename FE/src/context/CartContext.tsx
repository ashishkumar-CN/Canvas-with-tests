import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, addToCart, removeCartItem, updateCartItem, clearCart } from '@/redux/cart/action';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  // Using 'any' for now as root state type is not strictly typed yet
  const { items, totalItems, totalPrice } = useSelector((state: any) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAddToCart = async (item: Omit<CartItem, 'quantity'>) => {
    try {
      await dispatch(addToCart(item.id, 1) as any);
      // Fetch updated cart to align state immediately (in case backend calculates things)
      await dispatch(fetchCart() as any);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeCartItem(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateCartItem(id, quantity));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart: handleAddToCart,
      removeFromCart: handleRemoveFromCart,
      updateQuantity: handleUpdateQuantity,
      clearCart: handleClearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
