'use client';

import './page.scss';
import TotalCost from './totalCost/TotalCost';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropertyDetails from './propertyDetails/PropertyDetails';
import Funds from './funds/Funds';
import StoreProvider from './StateProvider';
import Grid from './grid/Grid';
// import store from 'app/cashflow/lib/store';

export default function Cashflow({}) {
  return (
    <StoreProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="cashflowWrapper">
          <PropertyDetails />
          <Grid />
          {/* <TotalCost /> */}
          <Funds />
        </div>
      </LocalizationProvider>
    </StoreProvider>
  );
}
