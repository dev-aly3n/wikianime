import { createSlice } from '@reduxjs/toolkit';


const counterInitialState = { counter: 0};

const counterSlice = createSlice({
    name:'counter',
    initialState: counterInitialState,
    reducers: {
      increment(state, action){
          let type = action.type;
          let payload = action.payload.xDirection;
          state.counter = state.counter + payload;
      },
      decrement(state){
        state.counter--;
      }
    }
});
//
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
