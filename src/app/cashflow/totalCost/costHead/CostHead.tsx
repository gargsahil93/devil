import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import NumberInput from 'app/components/NumberInput';
import './costHead.scss';
import {
  CostHeadFields,
  CostHeadType,
  PaymentScheduleType,
} from 'app/cashflow/types/cost';
import { ChangeEvent } from 'react';

export default function CostHead({
  cost,
  updateCostHead,
}: {
  cost: CostHeadType;
  updateCostHead: (
    id: string,
    key: CostHeadFields,
    value?: string | number | boolean,
  ) => void;
}) {
  const updateValue = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<PaymentScheduleType>,
  ) => {
    const key = e.target.name.split('_')[0];
    let value;
    switch (key) {
      case CostHeadFields.VALUE:
      case CostHeadFields.GST:
      case CostHeadFields.PAYMENT_SCHEDULE:
        value = +e.target.value;
        break;
      case CostHeadFields.TDS_APPLICABLE:
        if (e.target instanceof HTMLInputElement) value = e.target.checked;
        break;
      default:
        return;
    }
    updateCostHead(cost.id, key, value);
  };

  const { label, value, gst, id, paymentSchedule, tdsApplicable } = cost;
  return (
    <div className="costHeadRow">
      <span className="rowCell head">{label}</span>
      <span className="rowCell cost">
        <NumberInput
          value={value ? `${value}` : ''}
          setValue={updateValue}
          id={`value_${id}`}
          name={`value_${id}`}
        />
      </span>
      <span className="rowCell gst">
        <NumberInput
          value={'' + gst}
          setValue={updateValue}
          id={`gst_${id}`}
          name={`gst_${id}`}
        />
      </span>
      <span className="rowCell gstValue">
        {(((value || 0) * gst) / 100).toFixed(2)}
      </span>
      <span className="rowCell total">
        {((value || 0) * (1 + gst / 100)).toFixed(2)}
      </span>
      <span className="rowCell tds">
        <Switch
          checked={tdsApplicable}
          onChange={updateValue}
          name={`tdsApplicable_${id}`}
          size="small"
        />
      </span>
      <span className="rowCell paymentSchedule">
        <FormControl fullWidth>
          <Select
            id={`paymentSchedule_${id}`}
            name={`paymentSchedule_${id}`}
            value={paymentSchedule}
            onChange={updateValue}
            variant="standard"
            size="small"
          >
            <MenuItem value={PaymentScheduleType.ONE_TIME}>
              One time payment
            </MenuItem>
            <MenuItem value={PaymentScheduleType.INSTALLMENTS}>
              In installments
            </MenuItem>
          </Select>
        </FormControl>
      </span>
    </div>
  );
}
