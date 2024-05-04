import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: null
  },
  reducers: {
    setUser: (users, action) => {
        // console.log('setUser', action.payload);
        users.currentUser = action.payload;
    }
  }
})

export const { setUser } = userSlice.actions;

export const selectUsers = state => state.users;

export default userSlice.reducer;