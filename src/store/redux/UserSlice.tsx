const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');
import Axios from 'axios';
import {setAsyncItem} from '../../services';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    status: STATUSES.IDLE,
  },
  extraReducers: builder => {
    builder
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
export const signUpPost = createAsyncThunk('type/postData', async userData => {
  try {
    let response = await fetch('https://cackestoreapi.onrender.com/signup', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(userData),
      headers: {'Content-Type': 'application/json'},
    });
    // let user = response.json();
    // return user;
  } catch (error) {
    // this is the main part. Use the response property from the error object
    return error.response;
  }
});

export const signInPost = createAsyncThunk('type/postData', async userData => {
  try {
    let response = await fetch('https://cackestoreapi.onrender.com/signin', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(userData),
      headers: {'Content-Type': 'application/json'},
    }).then(res => res.json());
    await setAsyncItem('loggedData', response);
    return response;
  } catch (error) {
    // this is the main part. Use the response property from the error object
    return error.response;
  }
});

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
