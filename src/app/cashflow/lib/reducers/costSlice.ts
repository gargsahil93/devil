import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const costSlice = createSlice({
  name: 'cost',
  initialState: {
    value: [],
  },
  reducers: {
    updateCost: (state, action) => {
      console.log(action);
      return state;
    },
  },
});

export const { updateCost } = costSlice.actions;

export const selectCost = (state: RootState) => state.cost;

export default costSlice.reducer;
