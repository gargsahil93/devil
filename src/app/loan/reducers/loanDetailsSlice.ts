import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../lib/store';
import { setLoanDetails } from '../loanDetails/LoanDetailModel';

export const loanDetailsSlice = createSlice({
  name: 'loanDetails',
  initialState: { loanAmount: '', tenure: '', startDate: '' },
  reducers: {
    updateLoanDetails: (state, action) => {
      const newState = { ...state, ...action.payload };
      setLoanDetails(newState);
      return newState;
    },
  },
});

export const { updateLoanDetails } = loanDetailsSlice.actions;

export const selectLoanDetails = (state: RootState) => state.loanDetails;

export default loanDetailsSlice.reducer;
