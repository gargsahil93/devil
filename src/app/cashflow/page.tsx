'use client';

import { TextField } from '@mui/material';
import './page.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import NumberInput from 'app/components/NumberInput';
import TotalCost from './totalCost/TotalCost';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropertyDetails from './propertyDetails/PropertyDetails';

export default function Cashflow({}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="cashflowWrapper">
        <PropertyDetails />
        <TotalCost />
      </div>
    </LocalizationProvider>
  );
}
