import axios from 'axios';

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
        state.cart = action.payload;
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
    console.warn(
      `https://cackestoreapi.onrender.com/getaddetocartdata/${userId}`,
    );
    const res = await fetch(
      `https://cackestoreapi.onrender.com/getaddetocartdata/${userId}`,
    );
    const data = await res.json();
    return data;
  },
);

export const addToCartPost = createAsyncThunk(
  'addcartpost/fetch',
  async product => {
    let dataSource = product;
    dataSource.key = product.product._id;
    dataSource.updatedPrice = product.product.price;
    try {
      let response = await fetch(
        `https://cackestoreapi.onrender.com/addcartpost/${product.userId}/${product.product._id}`,
        {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(dataSource),
          headers: {'Content-Type': 'application/json'},
        },
      );
      // console.warn('addtocart resp', response);
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
  async (dataSource: any) => {
    const item = dataSource.body;
    var data = {
      key: item.key,
      price: Math.round(item.product.price),
      qty: 1,
    };
    console.warn(data);
    console.warn(
      `https://cackestoreapi.onrender.com/updatequantity/${dataSource.action}/${dataSource.body.key}/${dataSource.body.userId}`,
    );
    axios
      .put(
        `https://cackestoreapi.onrender.com/updatequantity/${dataSource.action}/${dataSource.body.key}/${dataSource.body.userId}`,
        data,
      )
      .then(response => {
        console.log('Item updated successfully');
      })
      .catch(error => {
        console.error('Error update item:', error);
      });
  },
);

export const deleteAddCartItem = createAsyncThunk(
  'deleteproduct/fetch',
  async ({uId, pId}) => {
    axios
      .delete(`https://cackestoreapi.onrender.com/deleteproduct/${uId}/${pId}`)
      .then(response => {
        console.log('Item deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  },
);
