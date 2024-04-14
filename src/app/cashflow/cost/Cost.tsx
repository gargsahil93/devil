import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCost,
  updateCost,
  updateCostHead,
} from '../lib/reducers/costSlice';
import CostHead from '../totalCost/costHead/CostHead';
import { Button } from '@mui/material';
import { CostHeadFields, CostHeadType } from '../types/cost';
import {
  getCostHeads,
  initCostHeads,
  setCostHeads as setGlobalCostHeads,
} from 'app/initialData/costHeads';

export default function Cost({ className }: { className: string }) {
  const dispatch = useDispatch();

  const costHeads = useSelector(selectCost);

  useEffect(() => {
    dispatch(updateCost(getCostHeads()));
  }, []);

  const updateLocalCost = (cost: CostHeadType) => {
    const newCostHeads = costHeads.map((costHead) => {
      if (costHead.id === cost.id) {
        return { ...cost };
      }
      return { ...costHead };
    });
    setGlobalCostHeads(newCostHeads);
  };

  const updateHead = (
    id: string,
    key: CostHeadFields,
    value?: number | string | boolean,
  ) => {
    dispatch(updateCostHead({ id, key, value }));
  };

  return (
    <div className={className}>
      <div className="gridRow headerRow">
        <div className="gridCol headerCol">HEAD</div>
        <div className="gridCol headerCol">COST</div>
        <div className="gridCol headerCol">GST %</div>
        <div className="gridCol headerCol">GST VALUE</div>
        <div className="gridCol headerCol">TOTAL COST</div>
        <div className="gridCol headerCol">TDS</div>
        <div className="gridCol headerCol">PAYMENT SCHEDULE</div>
      </div>
      {costHeads.map((head, idx) => (
        <CostHead
          cost={head}
          updateCostHead={updateHead}
          key={idx}
        />
      ))}
      <div className="gridRow">
        <div className="gridCol">
          <Button size="small">Add cost head</Button>
        </div>
      </div>
    </div>
  );
}
