import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CostHeadFields, CostHeadType } from 'app/cashflow/types/cost';
import { setCostHeads as setGlobalCostHeads } from 'app/initialData/costHeads';

const initialState: Array<CostHeadType> = [];

export const costSlice = createSlice({
  name: 'cost',
  initialState,
  reducers: {
    updateCost: (state, action) => {
      return action.payload;
    },
    updateCostHead: (
      state,
      action: {
        type: string;
        payload: {
          id: string;
          key: CostHeadFields;
          value?: number | string | boolean;
        };
      },
    ) => {
      const newState = state.map((costHead) => {
        if (costHead.id !== action.payload.id) {
          return costHead;
        } else {
          return { ...costHead, [action.payload.key]: action.payload.value };
        }
      });
      setGlobalCostHeads(newState);
      return newState;
    },
  },
});

export const { updateCost, updateCostHead } = costSlice.actions;

export const selectCost = (state: RootState) => state.cost;

export default costSlice.reducer;
