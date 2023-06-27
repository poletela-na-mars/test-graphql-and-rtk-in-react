import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  byId: {},
  allIds: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.byId[action.payload.id] = action.payload;
      state.allIds.push(action.payload.id);
    },
  },
});

export const { addBook } = booksSlice.actions;

export default booksSlice.reducer;
