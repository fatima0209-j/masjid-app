import { IUser } from '@app/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  currentUser: IUser | null;
}

const initialState: AuthState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUser | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
