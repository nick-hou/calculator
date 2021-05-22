import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queue: '',
};

export const calcSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    pressKey: (state, action) => {
      console.log(action.payload);
      return state;
    }
  }
});

export const { pressKey } = calcSlice.actions;

// export const select= (state) => state.;


export default calcSlice.reducer;
