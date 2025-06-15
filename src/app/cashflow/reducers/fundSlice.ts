import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../lib/store';
import { FundFields, FundType } from 'app/cashflow/types/fund';
import { updateFundsStorage } from 'app/cashflow/funds/FundModel';
import { v4 as uuidv4 } from 'uuid';

const initialState: Array<FundType> = [];

export const fundSlice = createSlice({
  name: 'fund',
  initialState,
  reducers: {
    updateFunds: (_, action) => {
      return action.payload;
    },
    updateFund: (
      state,
      action: {
        type: string;
        payload: {
          id: string;
          key: FundFields;
          value?: number | string | boolean;
        };
      },
    ) => {
      const newState = state.map((fund) => {
        if (fund.id !== action.payload.id) {
          return fund;
        } else {
          return { ...fund, [action.payload.key]: action.payload.value };
        }
      });
      updateFundsStorage(newState);
      return newState;
    },
    addFund: (state, action: { type: string; payload: void }) => {
      const newState = [...state];
      newState.push({ [FundFields.ID]: uuidv4() });
      updateFundsStorage(newState);
      return newState;
    },
    deleteFund: (state, action: { type: string; payload: { id: string } }) => {
      const newState = state.filter((fund) => fund.id !== action.payload.id);
      updateFundsStorage(newState);
      return newState;
    },
  },
});

export const { addFund, deleteFund, updateFund, updateFunds } =
  fundSlice.actions;

export const selectFund = (state: RootState) => state.fund;

export default fundSlice.reducer;
