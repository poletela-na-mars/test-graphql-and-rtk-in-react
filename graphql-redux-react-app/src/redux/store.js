import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';

const store = configureStore({
  reducer: booksReducer,
});

export default store;
