/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const addToCart = (product, cantidad) => {
    if (isInCart(product.id)) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, cantidad: item.cantidad + cantidad } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, cantidad }]);
    }
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCantidadActual = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.cantidad : 0;
  };

  const getCartQuantity = () => {
    return cart.reduce((total, item) => total + item.cantidad, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        isInCart,
        clearCart,
        getCantidadActual,
        getCartQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
