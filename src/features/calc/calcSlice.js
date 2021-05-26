import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queue: '',
  status: 'inwork'
};

export const calcSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    pressKey: (state, action) => {
      const keyPressed = action.payload.keyPressed;
      const stage = action.payload.stageText;
      switch (keyPressed) {
        // For /*-+, if the stage contains a number, push the stage and operation to the queue.
        // If the stage is already an operation, replace the last char in the queue with the new operation
        case '/':
        case '*':
        case '+':
        case '-':
          if(state.status === 'solved') {
            state.queue = '';
            state.status = 'inwork'
          }
          if(/[/*+-]/.test(stage)) {
            state.queue = state.queue.substr(0, state.queue.length-1).concat(keyPressed);
          } else {
            state.queue = state.queue.concat(stage).concat(keyPressed);
          }
          break;
        // For AC, clear the queue
        case 'AC':
          state.status = 'inwork';
          state.queue = '';
          break;
        // For =, push '=' to the queue and update state's solution
        // Avoid using eval() for security reasons - so we'll make our own function!
        case '=':
          if(state.status === 'inwork') {
            state.status = 'solved';
            state.queue = state.queue.concat(stage + '=')
          break;
          }
          break;
        default:
          state.status = 'inwork'
          break;
      }
      return state;
    }
  }
});

export const { pressKey } = calcSlice.actions;

// export const select= (state) => state.;


export default calcSlice.reducer;
