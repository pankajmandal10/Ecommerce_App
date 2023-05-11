const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');
import Axios from 'axios';
import {setAsyncItem} from '../../services';
import axios from 'axios';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    singUpUser: [],
    status: STATUSES.IDLE,
  },
  extraReducers: builder => {
    builder
      .addCase(signUpPost.pending, (state: any, action: any) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(signUpPost.fulfilled, (state: any, action) => {
        state.singUpUser = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(signUpPost.rejected, (state: any, action: any) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(signInPost.pending, (state: any, action: any) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(signInPost.fulfilled, (state: any, action) => {
        state.user = action.payload;
      })
      .addCase(signInPost.rejected, (state: any, action: any) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(getLoggedUser.pending, (state: any, action: any) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getLoggedUser.fulfilled, (state: any, action: any) => {
        state.user = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(getLoggedUser.rejected, (state: any, action: any) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const {setProducts, setStatus} = UserSlice.actions;
export default UserSlice.reducer;

// Thunks
export const signUpPost = createAsyncThunk(
  'type/postData',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        'https://cackestoreapi.onrender.com/signup',
        userData,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const signInPost = createAsyncThunk(
  'signInPost/postData',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        'https://cackestoreapi.onrender.com/signin',
        userData,
      );
      await setAsyncItem('loggedData', response.data);
      await setAsyncItem('userId', response.data.savedUser._id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const userUpdate = createAsyncThunk(
  'userupdate/fetch',
  async (data: any) => {
    const resposne = await fetch(
      `https://cackestoreapi.onrender.com/updateuser/${data.id}`,
      {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(data.address),
        headers: {'Content-Type': 'application/json'},
      },
    )
      .then(res => res.json())
      .catch(error => {
        alert(error);
      });
  },
);
export const getLoggedUser = createAsyncThunk(
  'getloggedUser/fetch',
  async id => {
    const res = await fetch(
      `https://cackestoreapi.onrender.com/getloggedUser/${id}`,
    );
    const data = await res.json();
    return data;
  },
);
