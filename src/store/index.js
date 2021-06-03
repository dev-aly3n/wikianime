import { configureStore } from '@reduxjs/toolkit';
import animeListReducer from './animeListSlice';




const store = configureStore({
  reducer: {
    animeList: animeListReducer
  }
})

export default store;
