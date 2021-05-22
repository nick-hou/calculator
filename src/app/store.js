import { configureStore } from '@reduxjs/toolkit';
import calcReducer from '../features/calc/calcSlice';

export const store = configureStore({
  reducer: {
    calculator: calcReducer,
  },
});
