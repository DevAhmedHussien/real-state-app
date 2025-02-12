// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0, 
  totalPrice: 0, 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add an item to the cart
    addItem: (state, action) => {
      const newItem = action.payload;
      console.log('newItem' , newItem)
      const existingItem = state.items.find((item) => item.id === newItem.id &&  item.selectedProduct.color === newItem.selectedProduct.color && item.selectedProduct.size  === newItem.selectedProduct.size );

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      } else {
        // If the item is new, add it to the cart
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      // Update total quantity and total price
      state.totalQuantity += 1;
      state.totalPrice += newItem.price;
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;

        state.totalQuantity += quantityDifference;
        state.totalPrice += existingItem.price * quantityDifference;
      }
    },
    // Remove an item from the cart
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        // If the item's quantity is 1, remove it from the cart
        state.items = state.items.filter((item) => item.id !== id);
      } else {

        // If the item's quantity is more than 1, decrease its quantity
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
      }

      // Update total quantity and total price
      state.totalQuantity -= 1;
      state.totalPrice -= existingItem.price;
    },

    // Clear the entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Export the actions
export const { addItem, removeItem, clearCart ,updateQuantity} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;