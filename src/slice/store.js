import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './userSlice.js';
import { userSlice } from './userSlice.js';

export default configureStore({
    reducer: {
      users: userSlice.reducer // Correct the reducer name
    }
  });