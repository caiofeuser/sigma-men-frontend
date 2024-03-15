"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { CartItem, CartContextType } from "@/types";

const CartContext = createContext<CartContextType>({
  cartItems: [],
  handleAddSameToCart: () => {},
  handleSubtractSameFromCart: () => {},
  handleRemoveFromCart: () => {},
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  handleTotalQuantity: () => 0,
});

interface CartType {
  children: React.ReactNode;
}

export function CartWrapper({ children }: CartType) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (cartItem: CartItem) => {
    //check by id if the item is already in the cart
    const itemIndex = cartItems.findIndex((item) => item.id === cartItem.id);
    // if the item is already in the cart
    if (itemIndex !== -1) {
      // increment the quantity
      const newCart = cartItems.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            quantity: item.quantity + 1,
            total: item.price * (item.quantity + 1),
          };
        }
        return item;
      });
      setCartItems(newCart);
      return;
    } else {
      setCartItems([...cartItems, cartItem]);
    }
  };

  const removeItem = (cartItem: CartItem) => {
    const newCart = cartItems.filter((_, i) => i !== cartItem.id);
    setCartItems(newCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleTotalQuantity = () => {
    return cartItems.reduce((acc, cartItem) => {
      const total = cartItem.total ? cartItem.total : cartItem.price;
      return acc + total;
    }, 0);
  };

  const handleAddSameToCart = (cartItem: CartItem) => {
    setCartItems((prev: CartItem[]) => {
      const newCart = prev.map((item, i) => {
        if (item.id === cartItem.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            total: item.price * (item.quantity + 1),
          };
        }
        return item;
      });
      return newCart;
    });
  };

  const handleSubtractSameFromCart = (cartItem: CartItem) => {
    setCartItems((prev: CartItem[]) => {
      const itemIndex = prev.findIndex((item) => item.id === cartItem.id);

      if (itemIndex === -1) {
        return prev;
      }

      const newCart = [...prev];
      const item = newCart[itemIndex];

      if (item.quantity === 1) {
        newCart.splice(itemIndex, 1); // Remove o item do carrinho se a quantidade for 1
      } else {
        newCart[itemIndex] = {
          ...item,
          quantity: item.quantity - 1,
          total: item.price * (item.quantity - 1),
        };
      }

      return newCart;
    });
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    setCartItems((prev: CartItem[]) => {
      const newCart = prev.filter((item) => item.id !== cartItem.id);
      return newCart;
    });
  };

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
    // console.log(cartItems);
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        clearCart,
        handleTotalQuantity,
        handleAddSameToCart,
        handleSubtractSameFromCart,
        handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
