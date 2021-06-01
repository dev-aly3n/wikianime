import { createSlice } from '@reduxjs/toolkit';


const counterInitialState = { counter: {}};

const counterSlice = createSlice({
    name:'counter',
    initialState: counterInitialState,
    reducers: {
      increment(state, action){
          state.counter = action.payload;
      }
    }
});


export const AnimeData = (data) => {
  return async (dispatch) => {
 
    const gettingData = async () =>{

      const animData = await data;
     
      dispatch(
       counterSlice.actions.increment({payload: animData})
       )
      }

      gettingData();
  }
  
}


//
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
