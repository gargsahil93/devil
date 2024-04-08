'use client';

import { TextField } from '@mui/material';
import './page.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import NumberInput from 'app/components/NumberInput';
import TotalCost from './totalCost/TotalCost';

export default function Cashflow({}) {
  return (
    <div className="cashflowWrapper">
      <div>
        <TextField variant="outlined" label="Property name" />
      </div>
      <TotalCost />
    </div>
  );
}
