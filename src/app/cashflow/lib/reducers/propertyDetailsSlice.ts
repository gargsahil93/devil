import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../lib/store';
import dayjs, { Dayjs } from 'dayjs';
import {
  PropertyDetailFields,
  PropertyDetailsType,
} from 'app/cashflow/types/propertyDetails';
import { setPropertyDetails } from 'app/cashflow/propertyDetails/PropertyDetailsModel';

export const propertyDetailsSlice = createSlice({
  name: 'propertyDetails',
  initialState: { name: '', bookingDate: '', possesionDate: '' },
  reducers: {
    updatePropertyDetails: (state, action) => {
      const newState = { ...state, ...action.payload };
      setPropertyDetails(newState);
      return newState;
    },
  },
});

export const { updatePropertyDetails } = propertyDetailsSlice.actions;

export const selectPropertyDetails = (state: RootState) =>
  state.propertyDetails;

export default propertyDetailsSlice.reducer;
