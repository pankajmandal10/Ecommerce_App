const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

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

const addCartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCartItems.pending, (state: any, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchCartItems.fulfilled, (state: any, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchCartItems.rejected, (state: any, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const {setProducts, setStatus} = addCartSlice.actions;
export default addCartSlice.reducer;

// Thunks
export const fetchCartItems = createAsyncThunk(
  'getaddetocartdata/fetch',
  async userId => {
    const res = await fetch(
      'https://cackestoreapi.onrender.com/getaddetocartdata/63f88487570928c73e26d7c4',
    );
    const data = await res.json();
    return data;
  },
);

export const addToCartPost = createAsyncThunk(
  'addcartpost/fetch',
  async (addcartdata, userId, productId) => {
    try {
      let response = await fetch(
        'https://cackestoreapi.onrender.com/addcartpost/63fb0a638db185910d377af2/64032496e9b8386f18e72244',
        {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(addcartdata),
          headers: {'Content-Type': 'application/json'},
        },
      );
      // let user = response.json();
      // return user;
    } catch (error) {
      // this is the main part. Use the response property from the error object
      return error.response;
    }
  },
);

export const updateCartItem = createAsyncThunk(
  'updatequantity/fetch',
  async (body, action, userId, productId) => {
    try {
      const updatedData = await fetch(
        'https://cackestoreapi.onrender.com/updatequantity/increment/64032496e9b8386f18e72244/63fb0a638db185910d377af2',
      ).then(res => res.json());
      console.warn(updatedData);
    } catch (error) {
      alert(error);
    }
  },
);
