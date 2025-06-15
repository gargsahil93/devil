'use client';

import './page.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import StoreProvider from '../lib/StateProvider';
import LoanDetails from './loanDetails/LoanDetails';

export default function Cashflow({}) {
  return (
    <StoreProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="loanWrapper">
          <LoanDetails />
        </div>
      </LocalizationProvider>
    </StoreProvider>
  );
}
