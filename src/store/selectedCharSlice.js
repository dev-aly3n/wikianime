import { createSlice } from '@reduxjs/toolkit';


const selectedCharInitialState = { selectedChar: undefined,
};

const selectedCharSlice = createSlice({
    name:'selectedChar',
    initialState: selectedCharInitialState,
    reducers: {
      selectChar(state, action){
        state.selectedChar = action.payload;
      }
    }
});


// export const homeAnimeData = (data) => async (dispatch) => {
//     const gettingData = async () => {
//       if(data){
//       const animData = data;
//       dispatch(animeListSlice.actions.setDataAtFirst(animData.Page.media));
//       }
//       }
//      gettingData();
// }



//
export const selectedCharActions = selectedCharSlice.actions;
export default selectedCharSlice.reducer;
