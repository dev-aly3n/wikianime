import { createSlice } from '@reduxjs/toolkit';


const AnimeListInitialState = { homeAnime: [],
watch: [],
search:[]
};

const animeListSlice = createSlice({
    name:'animeList',
    initialState: AnimeListInitialState,
    reducers: {
      setDataAtFirst(state, action){
          state.homeAnime = action.payload;
      },
    }
});


export const homeAnimeData = (data) => async (dispatch) => {
    const gettingData = async () => {
      if(data){
      const animData = data;
      dispatch(animeListSlice.actions.setDataAtFirst(animData.Page.media));
      }
      }
     gettingData();
}



//
export const animeListActions = animeListSlice.actions;
export default animeListSlice.reducer;
