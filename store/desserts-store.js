import { create } from "zustand";

const useDessertStore = create((set) => ({
  cart: [],
  totalPrice: 0,
  // Add or update an item in the cart and update the total price
  setCart: (name, quantity, price) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.name === name
      );

      let updatedCart;
      if (existingItemIndex >= 0) {
        if (quantity === 0) {
          // If quantity is 0, remove the item from the cart
          updatedCart = state.cart.filter((item) => item.name !== name);
        } else {
          // If the item exists, update its quantity and price
          updatedCart = [...state.cart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: quantity, // Set quantity to the new value
            price, // Update the price to the new value
          };
        }
      } else {
        // If the item doesn't exist and quantity is not 0, add a new item
        if (quantity > 0) {
          updatedCart = [...state.cart, { name, quantity, price }];
        } else {
          updatedCart = state.cart; // If quantity is 0, no item is added
        }
      }

      // Recalculate the total price
      const updatedTotalPrice = updatedCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return { cart: updatedCart, totalPrice: updatedTotalPrice };
    }),

  // Function to remove an item by name from the cart
  removeItemByName: (name) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.name !== name);

      // Recalculate the total price after removing the item
      const updatedTotalPrice = updatedCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      return { cart: updatedCart, totalPrice: updatedTotalPrice };
    }),
  resetCart: () =>
    set(() => ({
      cart: [],
      totalPrice: 0,
    })),
}));

export default useDessertStore;
