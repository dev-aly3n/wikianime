import { createSlice } from '@reduxjs/toolkit';


const AnimeListInitialState = { homeAnime: [],
watch: [],
selected:[],
search:[]
};

const animeListSlice = createSlice({
    name:'animeList',
    initialState: AnimeListInitialState,
    reducers: {
      setDataAtFirst(state, action){
          state.homeAnime = action.payload;
      },
      selectedAnime(state,action){
        state.selected = action.payload[0];
      }
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


export const selectedAnimeData = (data) => async (dispatch) => {
  const gettingData = async () => {
    if(data){
    const selectedData = data;
    dispatch(animeListSlice.actions.selectedAnime(selectedData.Page.media));
    }
    }
   gettingData();
}


//
export const animeListActions = animeListSlice.actions;
export default animeListSlice.reducer;
