import { configureStore } from '@reduxjs/toolkit';
import scrollYHistoryReducer from './scrollYHistorySlice';

const store = configureStore({
  reducer: {
    scrollYHistory: scrollYHistoryReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
