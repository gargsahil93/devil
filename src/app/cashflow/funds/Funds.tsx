import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { FundType } from './types';
import FundHead from './fundHead/FundHead';

import './funds.scss';
import { getFunds, updateFundsStorage } from './FundModel';

export default function Funds({}) {
  const [funds, setFunds] = useState<Array<FundType>>([]);

  useEffect(() => {
    setFunds(getFunds());
  }, []);

  const createFund = () => {
    setFunds((funds) => {
      const newFunds = [...funds];
      newFunds.push({ id: `${funds.length}` });
      return newFunds;
    });
  };
  const updateFund = (updatedFund: FundType) => {
    setFunds((funds) => {
      const newFunds = funds.map((fund: FundType) => {
        if (fund.id === updatedFund.id) {
          return { ...updatedFund };
        }
        return { ...fund };
      });
      updateFundsStorage(newFunds);
      return newFunds;
    });
  };
  return (
    <div>
      <Button variant="contained" onClick={createFund}>
        Add Fund Source
      </Button>
      <div className="fundHeadHeader">
        <span className="headerCell">Source</span>
        <span className="headerCell">Frequency</span>
        <span className="headerCell">Amount</span>
        <span className="headerCell">Interest/Yearly Increase %</span>
        <span className="headerCell">Available From</span>
      </div>
      <div className="fundHeads">
        {funds.map((fund, index) => (
          <FundHead fund={fund} key={index} setFund={updateFund} />
        ))}
      </div>
    </div>
  );
}
