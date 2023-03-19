const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const ProductSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const {setProducts, setStatus} = ProductSlice.actions;
export default ProductSlice.reducer;

// Thunks
export const fetchProducts = createAsyncThunk('productlist/fetch', async () => {
  const res = await fetch('https://cackestoreapi.onrender.com/productlist');
  const data = await res.json();
  return data;
});

export const addToCartPost = createAsyncThunk(
  'type/addcartpost',
  async addcartdata => {
    try {
      let response = await fetch(
        'https://cackestoreapi.onrender.com/api/v1/addcartpost/',
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
