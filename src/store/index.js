import { configureStore } from '@reduxjs/toolkit';
import animeListReducer from './animeListSlice';




const store = configureStore({
  reducer: {
    animelist: animeListReducer
  }
})

export default store;
