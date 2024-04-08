'use client';

import NumberInput from 'app/components/NumberInput';
import {
  getCostHeads,
  initCostHeads,
  setCostHeads as setGlobalCostHeads,
} from 'app/initialData/costHeads';
import { ChangeEvent, useEffect, useState } from 'react';
import './totalCost.scss';
import CostHead from './costHead/CostHead';
import { CostHeadType } from './types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function TotalCost() {
  const [costHeads, setCostHeads] = useState<Array<CostHeadType>>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!getCostHeads()) {
      initCostHeads();
    }
    setCostHeads(getCostHeads());
  }, []);

  useEffect(() => {
    setTotal(
      costHeads.reduce((sum, { value, gst }) => {
        return sum + (value || 0) * (1 + gst / 100);
      }, 0),
    );
  }, [costHeads]);

  const updateCost = (cost: CostHeadType) => {
    setCostHeads(() => {
      const newCostHeads = costHeads.map((costHead) => {
        if (costHead.id === cost.id) {
          return { ...cost };
        }
        return { ...costHead };
      });
      setGlobalCostHeads(newCostHeads);
      return newCostHeads;
    });
  };
  return (
    <div className="totalCost">
      {costHeads && (
        <>
          <div className="costHeadRow header">
            <span className="rowCell head">Head</span>
            <span className="rowCell cost">Cost</span>
            <span className="rowCell gst">GST %</span>
            <span className="rowCell gstValue">Total GST</span>
            <span className="rowCell total">Total Cost</span>
            <span className="rowCell tds">TDS Applicable</span>
            <span className="rowCell paymentSchedule">Payment Schedule</span>
          </div>
          {costHeads.map((costHead) => (
            <CostHead cost={costHead} setCost={updateCost} key={costHead.id} />
          ))}
          <div className="costHeadRow total">
            <span className="rowCell">Total</span>
            <span className="rowCell"></span>
            <span className="rowCell"></span>
            <span className="rowCell"></span>
            <span className="rowCell">{total}</span>
            <span className="rowCell"></span>
            <span className="rowCell"></span>
          </div>
        </>
      )}
    </div>
  );
}
