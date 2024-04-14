import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';
import {
  CostHeadFields,
  CostHeadType,
  PaymentScheduleType,
} from 'app/cashflow/types/cost';
import { setCostHeads as setGlobalCostHeads } from 'app/initialData/costHeads';

const initialState: Array<CostHeadType> = [];

export const costSlice = createSlice({
  name: 'cost',
  initialState,
  reducers: {
    updateCost: (_, action) => {
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
    addCostHead: (state, action: { type: string; payload: void }) => {
      const newState = [...state];
      newState.push({
        [CostHeadFields.ID]: uuidv4(),
        [CostHeadFields.PAYMENT_SCHEDULE]: PaymentScheduleType.CUSTOM,
        [CostHeadFields.TDS_APPLICABLE]: false,
      });
      setGlobalCostHeads(newState);
      return newState;
    },
    deleteCostHead: (
      state,
      action: { type: string; payload: { id: string } },
    ) => {
      const newState = state.filter((head) => head.id !== action.payload.id);
      setGlobalCostHeads(newState);
      return newState;
    },
  },
});

export const { addCostHead, deleteCostHead, updateCost, updateCostHead } =
  costSlice.actions;

export const selectCost = (state: RootState) => state.cost;

export default costSlice.reducer;
