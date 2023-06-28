import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: []
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
  },
});

export const { addBook } = booksSlice.actions;
// TODO - addBook

export default booksSlice.reducer;
