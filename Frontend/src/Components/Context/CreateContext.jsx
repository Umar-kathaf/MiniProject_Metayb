import { createContext, useContext, useEffect, useState } from "react";
import {
  addtoCartAPI,
  getCartAPI,
  removeCartAPI,
  updateQuantityAPI,
} from "../../API/CartApi";

const CartContext = createContext();

export const CartProvider = ({ children}) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId")
    if (storedUserId) {
      setUserId(storedUserId)
    }
  }, [])
  // Fetch cart from backend when userId exists
  useEffect(() => {
    if (userId) {
      loadCart();
    }
  }, [userId]);

  const loadCart = async () => {
    try {
      const res = await getCartAPI(userId);
      setCartItems(res.data.cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Add item to cart
  const addToCart = async (bikeId, quantity = 1) => {
    try {
      const res = await addtoCartAPI({ userId, bikeId, quantity });
      
      // API should return updated cart or new item
      await loadCart(); // refresh from backend after add
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove item
  const removeFromCart = async (cartId) => {
    try {
      await removeCartAPI(cartId);
      await loadCart(); // refresh from backend after remove
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Update quantity
  const updateQuantity = async (cartId, quantity) => {
    try {
      await updateQuantityAPI(cartId, quantity);
      await loadCart(); // refresh from backend after update
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
