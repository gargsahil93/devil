import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import NumberInput from 'app/components/NumberInput';
import './costHead.scss';
import {
  CostHeadFields,
  CostHeadType,
  PaymentScheduleType,
} from 'app/cashflow/types/cost';
import { ChangeEvent, useState } from 'react';
import {
  DeleteForeverOutlined,
  DoneOutline,
  EditOutlined,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deleteCostHead, updateCostHead } from '../lib/reducers/costSlice';
import SmartTextField from 'app/components/SmartTextField';

export default function CostHead({ cost }: { cost: CostHeadType }) {
  const dispatch = useDispatch();

  const { label, value, gst, id, paymentSchedule, tdsApplicable } = cost;

  const updateValue = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<PaymentScheduleType>,
  ) => {
    const key = e.target.name.split('_')[0];
    let value;
    switch (key) {
      case CostHeadFields.LABEL:
        value = e.target.value;
        break;
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
    dispatch(updateCostHead({ id, key, value }));
  };

  return (
    <div className="costHeadRow">
      <span className="rowCell quickActions">
        <IconButton
          aria-label="Delete Cost Head"
          onClick={() => dispatch(deleteCostHead({ id: cost.id }))}
        >
          <Tooltip title="Delete Cost Head">
            <DeleteForeverOutlined />
          </Tooltip>
        </IconButton>
      </span>
      <Tooltip title={label}>
        <span className="rowCell head">
          <SmartTextField
            size="small"
            variant="standard"
            value={label}
            id={`label_${id}`}
            name={`label_${id}`}
            onChange={updateValue}
            zeroValue="Cost Head"
          />
        </span>
      </Tooltip>
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
          value={`${gst ? gst : ''}`}
          setValue={updateValue}
          id={`gst_${id}`}
          name={`gst_${id}`}
        />
      </span>
      <span className="rowCell gstValue">
        {gst ? (((value || 0) * gst) / 100).toFixed(2) : 0}
      </span>
      <span className="rowCell total">
        {((value || 0) * (1 + (gst || 0) / 100)).toFixed(2)}
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
            <MenuItem value={PaymentScheduleType.CUSTOM}>Custom</MenuItem>
          </Select>
        </FormControl>
      </span>
    </div>
  );
}
