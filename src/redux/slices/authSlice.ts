import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: IInitialState = {
  loggedInUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<IUser>
    ) => {
      state.loggedInUser = action.payload;
    },
    logout: (state) => {
      state.loggedInUser = null
    },
  },
});

// Export actions for use in components
export const { login, logout } = authSlice.actions;

// Export the reducer to be used in the store
export const authReducer = authSlice.reducer;
