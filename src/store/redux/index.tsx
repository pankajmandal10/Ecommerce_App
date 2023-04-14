import {configureStore} from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
import {cartReducer} from './CartSlice';
import userSlice from './UserSlice';
import logInSclice from './UserSlice';
import addCartSlice from './addCartSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    loginUser: logInSclice,
    cart: cartReducer,
    addcart: addCartSlice,
    product: productReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
