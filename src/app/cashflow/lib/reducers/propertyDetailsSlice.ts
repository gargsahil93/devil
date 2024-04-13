import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import dayjs, { Dayjs } from 'dayjs';
import {
  PropertyDetailFields,
  PropertyDetailsType,
} from 'app/cashflow/propertyDetails/types';

export const propertyDetailsSlice = createSlice({
  name: 'propertyDetails',
  initialState: {
    name: '',
    bookingDate: '',
    possesionDate: '',
  },
  reducers: {
    updatePropertyDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updatePropertyDetails } = propertyDetailsSlice.actions;

export const selectPropertyDetails = (state: RootState) =>
  state.propertyDetails;

export default propertyDetailsSlice.reducer;
