import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {userAPI} from '../user/userApi';
import type {AxiosError} from 'axios';

// Sample types that will be used
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

interface UpdateUserResponse {
  user: User;
  success: boolean;
}

export const updateUser = createAsyncThunk<
  User,
  {id: string} & Partial<User>,
  {
    rejectValue: ValidationErrors;
  }
>('users/update', async (userData, {rejectWithValue}) => {
  try {
    const {id, ...fields} = userData;
    const response = await userAPI.updateById<UpdateUserResponse>(id, fields);
    return response.data.user;
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data);
  }
});

interface UsersState {
  error: string | null | undefined;
  entities: Record<string, User>;
}

const initialState = {
  entities: {},
  error: null,
} as UsersState;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(updateUser.fulfilled, (state, {payload}) => {
      state.entities[payload.id] = payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export default usersSlice.reducer;
