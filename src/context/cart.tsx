"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { CartItem, CartContextType } from "@/types";
import { Carlito } from "next/font/google";

const CartContext = createContext<CartContextType>({
  cartItems: [],
  handleAddSameToCart: () => {},
  handleSubtractSameFromCart: () => {},
  handleRemoveFromCart: () => {},
  addItem: () => {},
  addItems: () => {},
  removeItem: () => {},
  clearCart: () => {},
  handleTotalQuantity: () => 0,
});

interface CartType {
  children: React.ReactNode;
}
const initialCartItems =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart") || "[]")
    : [];

export function CartWrapper({ children }: CartType) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(initialCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (cartItem: CartItem) => {
    //check by id if the item is already in the cart
    const itemIndex = cartItems.findIndex((item) => item.id === cartItem.id);
    console.log(cartItem);
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
      // localStorage.setItem("cart", JSON.stringify(newCart));
      return;
    } else {
      setCartItems([...cartItems, cartItem]);
    }
  };

  const addItems = (cartItemsToAdd: CartItem[]) => {
    // Iterate over the items to be added
    cartItemsToAdd.forEach((itemToAdd) => {
      // Check if the item is already in the cart
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === itemToAdd.id
      );

      // If the item is already in the cart, update the quantity
      if (existingItemIndex !== -1) {
        setCartItems((prevCartItems) => {
          return prevCartItems.map((item, index) => {
            if (index === existingItemIndex) {
              return {
                ...item,
                quantity: item.quantity + itemToAdd.quantity, // Summing quantities
                total: item.price * (item.quantity + itemToAdd.quantity), // Recalculate total
              };
            }
            return item;
          });
        });
      } else {
        // If the item is not in the cart, add it
        setCartItems((prevCartItems) => [...prevCartItems, itemToAdd]);
      }
    });
  };

  const removeItem = (cartItem: CartItem) => {
    const newCart = cartItems.filter((_, i) => i !== Number(cartItem.id));
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        addItems,
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
