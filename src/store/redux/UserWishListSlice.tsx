import axios from 'axios';
import {getAsyncItem, setAsyncItem} from '../../services';

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
  state: any;
  wishListItem: [];
}

// Workaround: wishListItem state instead of declaring variable type
const initialState = {
  wishListItem: [],
} as CounterState;

const UserWishList = createSlice({
  name: 'wishListItem',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchUserWishListItem.pending, (state: any, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchUserWishListItem.fulfilled, (state: any, action) => {
        state.wishListItem = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchUserWishListItem.rejected, (state: any, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addToWishListItem.pending, (state: any, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addToWishListItem.fulfilled, (state: any, action) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(addToWishListItem.rejected, (state: any, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const {setProducts, setStatus} = UserWishList.actions;
export default UserWishList.reducer;

// Thunks
export const fetchUserWishListItem = createAsyncThunk(
  'fetchUserWishListItem/fetch',
  async () => {
    const userId = await getAsyncItem('userId');
    const res = await fetch(
      `https://cackestoreapi.onrender.com/api/v1/wishlistItemGet/${userId}`,
    );
    const data = await res.json();
    await setAsyncItem('cartDataInLocalStorage', data);
    return data;
  },
);

export const addToWishListItem = createAsyncThunk(
  'addToWishListItem/fetch',
  async (data: any) => {
    const userId = await getAsyncItem('userId');
    axios
      .post(
        `https://cackestoreapi.onrender.com/api/v1/addProductToWishList/${userId}/${data._id}`,
        data,
      )
      .then(response => {
        // Process the response data
        // console.log(response.data);
        return response.data;
      })
      .catch(error => {
        // Handle any error
        console.error(error);
      });
  },
);
