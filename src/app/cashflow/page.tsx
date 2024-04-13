'use client';

import { TextField } from '@mui/material';
import './page.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import NumberInput from 'app/components/NumberInput';
import TotalCost from './totalCost/TotalCost';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropertyDetails from './propertyDetails/PropertyDetails';
import Funds from './funds/Funds';
import StoreProvider from './StateProvider';
// import store from 'app/cashflow/lib/store';

export default function Cashflow({}) {
  return (
    <StoreProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="cashflowWrapper">
          <PropertyDetails />
          <TotalCost />
          <Funds />
        </div>
      </LocalizationProvider>
    </StoreProvider>
  );
}
