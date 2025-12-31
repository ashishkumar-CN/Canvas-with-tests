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
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { items = [], totalItems = 0, totalPrice = 0 } = useSelector((state: any) => state.cart || {});
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAddToCart = async (item: Omit<CartItem, 'quantity'>) => {
    try {
      // Extract numeric ID for backend if it's a mock ID like 'p1'
      const numericIdOnly = item.id.replace(/\D/g, '');
      const productId = numericIdOnly ? parseInt(numericIdOnly, 10) : item.id;

      // Pass the whole item object to the Redux action as expected
      // but with the backend-ready numeric ID
      await dispatch(addToCart({ ...item, id: productId }, 1) as any);
      await dispatch(fetchCart() as any);
      setDrawerOpen(true);
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
      totalPrice,
      isDrawerOpen,
      setDrawerOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    return {
      items: [],
      addToCart: () => { },
      removeFromCart: () => { },
      updateQuantity: () => { },
      clearCart: () => { },
      totalItems: 0,
      totalPrice: 0,
      isDrawerOpen: false,
      setDrawerOpen: () => { },
    } as CartContextType;
  }
  return context;
};
