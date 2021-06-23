import { configureStore } from '@reduxjs/toolkit';
import selectedCharSlice from './selectedCharSlice';




const store = configureStore({
  reducer: {
    char: selectedCharSlice
  }
})

export default store;
