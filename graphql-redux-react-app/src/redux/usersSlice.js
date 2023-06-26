import { createSlice } from '@reduxjs/toolkit';
import { CREATE_USER } from '../graphql/mutations';

export const createUser = (formData) => async (dispatch, getState, { client }) => {
  const { data } = await client.mutate({
    mutation: CREATE_USER,
    variables: formData,
  });
  dispatch(addUser(data.createUser));
};

const initialState = {
  byId: {},
  allIds: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.byId[action.payload.id] = action.payload;
      state.allIds.push(action.payload.id);
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
