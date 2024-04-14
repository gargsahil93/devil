import { Button, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { FundType } from '../types/fund';
import FundHead from './fundHead/FundHead';

import './funds.scss';
import { getFunds, updateFundsStorage } from './FundModel';
import { useDispatch, useSelector } from 'react-redux';
import { addFund, selectFund, updateFunds } from '../lib/reducers/fundSlice';
import { AddOutlined } from '@mui/icons-material';

export default function Funds({ className }: { className: string }) {
  const dispatch = useDispatch();
  const funds = useSelector(selectFund);

  useEffect(() => {
    dispatch(updateFunds(getFunds()));
  }, [dispatch]);

  return (
    <div className={className}>
      <div className="gridRow headerRow">
        <div className="gridCol headerCol quickActions"></div>
        <div className="gridCol headerCol">Source</div>
        <div className="gridCol headerCol">Frequency</div>
        <div className="gridCol headerCol">Amount</div>
        <div className="gridCol headerCol">Yearly Increase</div>
        <div className="gridCol headerCol">Available from</div>
      </div>
      {funds.map((fund, index) => (
        <FundHead fund={fund} key={index} />
      ))}
      <div className="gridRow">
        <div className="gridCol">
          <IconButton
            aria-label="Add Cost Head"
            onClick={() => dispatch(addFund())}
          >
            <Tooltip title="Add Fund Source">
              <AddOutlined />
            </Tooltip>
          </IconButton>
        </div>
      </div>
    </div>
  );
}
