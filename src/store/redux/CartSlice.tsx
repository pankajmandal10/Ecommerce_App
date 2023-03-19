import {createSlice} from '@reduxjs/toolkit';

export type StateSliceType = {
  state: any;
};

// Define a type for the slice state
interface CounterState {
  value: number;
  grandTotal: number;
  product: object;
  state: any;
  cart: [];
}

// Workaround: cart state instead of declaring variable type
const initialState = {
  cart: [],
  product: {},
  grandTotal: 0,
} as CounterState;

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDetailsProduct: (state, action): any => {
      state.product = action.payload;
    },
    add: (state: any, action) => {
      const itemInCart = state.cart.find(
        item => item._id === action.payload._id,
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },
    incrementQuantity: (state: any, action) => {
      const item = state.cart.find(item => item._id === action.payload);
      item.quantity++;
      state.cart;
    },
    decrementQuantity: (state: any, action) => {
      const item = state.cart.find(item => item._id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    remove: (state: any, action) => {
      const removeItem = state.cart.filter(item => item._id !== action.payload);
      state.cart = removeItem;
    },
    countTotalPrice: (state: any, action: any) => {
      state.grandTotal = action.payload;
    },
  },
});

export const cartReducer = CartSlice.reducer;
export const {
  add,
  remove,
  addDetailsProduct,
  incrementQuantity,
  decrementQuantity,
  countTotalPrice,
} = CartSlice.actions;
