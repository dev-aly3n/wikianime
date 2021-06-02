import { createSlice } from '@reduxjs/toolkit';


const AnimeListInitialState = { homeAnime: {}
};

const animeListSlice = createSlice({
    name:'animelist',
    initialState: AnimeListInitialState,
    reducers: {
      setDataAtFirst(state, action){
          state.homeAnime = action.payload;
      }
    }
});


export const AnimeData = (data) => async (dispatch) => {
    const gettingData = async () => {
      const animData = await data;
      dispatch(animeListSlice.actions.setDataAtFirst(animData.Page.media));
      }
     gettingData();
}


//
export const animeListActions = animeListSlice.actions;
export default animeListSlice.reducer;
