import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

const initialState: {
  currentIndex: number;
  scrollYHistory: number[];
} = {
  currentIndex: 0,
  scrollYHistory: [],
};

const scrollYHistorySlice = createSlice({
  name: 'scrollPosition',
  initialState,
  reducers: {
    setCurrentScrollY: (state, { payload: scrollY }: PayloadAction<number>) => {
      state.scrollYHistory[state.currentIndex] = scrollY;
    },

    setCurrentIndex: (state, { payload: newIndex }: PayloadAction<number>) => {
      state.currentIndex = newIndex;
    },

    increaseCurrentIndex: (state) => {
      state.currentIndex += 1;
    },

    cutOverflow: (state) => {
      state.scrollYHistory.splice(state.currentIndex + 1);
    },
  },
});

export const {
  setCurrentScrollY,
  setCurrentIndex,
  increaseCurrentIndex,
  cutOverflow,
} = scrollYHistorySlice.actions;

export const selectCurrentScrollY = ({ scrollYHistory: state }: RootState) =>
  state.scrollYHistory[state.currentIndex] ?? 0;

export default scrollYHistorySlice.reducer;
