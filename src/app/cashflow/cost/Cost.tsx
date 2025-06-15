import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCostHead,
  selectCost,
  updateCost,
  updateCostHead,
} from '../reducers/costSlice';
import CostHead from '../costHead/CostHead';
import { Button, IconButton, Tooltip } from '@mui/material';
import { CostHeadFields, CostHeadType } from '../types/cost';
import {
  getCostHeads,
  initCostHeads,
  setCostHeads as setGlobalCostHeads,
} from 'app/initialData/costHeads';
import { AddOutlined } from '@mui/icons-material';

export default function Cost({ className }: { className: string }) {
  const dispatch = useDispatch();

  const costHeads = useSelector(selectCost);

  useEffect(() => {
    dispatch(updateCost(getCostHeads() || []));
  }, [dispatch]);

  return (
    <div className={className}>
      <div className="gridRow headerRow">
        <div className="gridCol headerCol quickActions"></div>
        <div className="gridCol headerCol">HEAD</div>
        <div className="gridCol headerCol">COST</div>
        <div className="gridCol headerCol">GST %</div>
        <div className="gridCol headerCol">GST VALUE</div>
        <div className="gridCol headerCol">TOTAL COST</div>
        <div className="gridCol headerCol">TDS</div>
        <div className="gridCol headerCol">PAYMENT SCHEDULE</div>
      </div>
      {costHeads.map((head, idx) => (
        <CostHead cost={head} key={idx} />
      ))}
      <div className="gridRow">
        <div className="gridCol">
          <IconButton
            aria-label="Add Cost Head"
            onClick={() => dispatch(addCostHead())}
          >
            <Tooltip title="Add Cost Head">
              <AddOutlined />
            </Tooltip>
          </IconButton>
        </div>
      </div>
      <div className="gridRow">
        <div className="gridCol quickActions"></div>
        <div className="gridCol">Total</div>
        <div className="gridCol"></div>
        <div className="gridCol"></div>
        <div className="gridCol"></div>
        <div className="gridCol">
          {costHeads
            .reduce(
              (sum, cost) =>
                sum + (cost.value || 0) * (1 + (cost.gst || 0) / 100),
              0,
            )
            .toFixed(2)}
        </div>
      </div>
      <div className="gridRow">
        <div className="gridCol quickActions"></div>
        <div className="">To pay builder</div>
      </div>
      <div className="gridRow">
        <div className="gridCol quickActions"></div>
        <div className="">TDS payable</div>
      </div>
    </div>
  );
}
