'use client';

import './page.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropertyDetails from './propertyDetails/PropertyDetails';
import Funds from './funds/Funds';
import StoreProvider from './StateProvider';
import Grid from './grid/Grid';

export default function Cashflow({}) {
  return (
    <StoreProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="cashflowWrapper">
          <PropertyDetails />
          <Grid />
        </div>
      </LocalizationProvider>
    </StoreProvider>
  );
}
