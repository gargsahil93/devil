import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  FundFields,
  FundFrequency,
  FundFrequencyRecurring,
  FundType,
} from '../../types/fund';
import NumberInput from 'app/components/NumberInput';
import { DateField, DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import './fundHead.scss';
import { useDispatch } from 'react-redux';
import { deleteFund, updateFund } from 'app/cashflow/lib/reducers/fundSlice';
import {
  DeleteForeverOutlined,
  DoneOutline,
  EditOutlined,
} from '@mui/icons-material';
import { useState } from 'react';

export default function FundHead({ fund }: { fund: FundType }) {
  const dispatch = useDispatch();

  const [editFund, setEditFund] = useState(!fund.name);

  const update = (key: FundFields, value: string | FundFrequency) => {
    dispatch(updateFund({ id: fund.id, key, value }));
  };

  return (
    <div className="gridRow">
      <span className="gridCol quickActions">
        <IconButton
          aria-label="Delete Cost Head"
          onClick={() => dispatch(deleteFund({ id: fund.id }))}
        >
          <Tooltip title="Delete Cost Head">
            <DeleteForeverOutlined />
          </Tooltip>
        </IconButton>
        <Tooltip title={editFund ? 'Confirm' : 'Edit Fund Source'}>
          <IconButton onClick={() => setEditFund((edit) => !edit)}>
            {editFund ? <DoneOutline /> : <EditOutlined />}
          </IconButton>
        </Tooltip>
      </span>
      <Tooltip title={fund.name}>
        {editFund ? (
          <span className="gridCol">
            <TextField
              size="small"
              variant="standard"
              value={fund[FundFields.NAME] || ''}
              onChange={(e) => {
                update(FundFields.NAME, e.target.value);
              }}
            />
          </span>
        ) : (
          <span className="gridCol">{fund.name}</span>
        )}
      </Tooltip>

      <span className="gridCol">
        <FormControl fullWidth>
          <Select
            size="small"
            variant="standard"
            value={fund[FundFields.FREQUENCY] ?? ''}
            onChange={(e) => {
              update(FundFields.FREQUENCY, e.target.value);
            }}
            id={`frequency_${fund.id}`}
          >
            <MenuItem value={FundFrequency.ONE_TIME}>One time</MenuItem>
            <MenuItem value={FundFrequency.MONTHLY}>Monthly</MenuItem>
            <MenuItem value={FundFrequency.QUARTERLY}>Quarterly</MenuItem>
            <MenuItem value={FundFrequency.HALF_YEARLY}>Half Yearly</MenuItem>
            <MenuItem value={FundFrequency.YEARLY}>Yearly</MenuItem>
          </Select>
        </FormControl>
      </span>
      <span className="gridCol">
        <NumberInput
          value={fund[FundFields.VALUE] || ''}
          setValue={(e) => {
            update(FundFields.VALUE, e.target.value);
          }}
        />
      </span>
      <span className="gridCol">
        {fund[FundFields.FREQUENCY] === FundFrequency.ONE_TIME ? (
          <NumberInput
            value={fund[FundFields.INTEREST] || ''}
            setValue={(e) => {
              update(FundFields.INTEREST, e.target.value);
            }}
          />
        ) : (
          <NumberInput
            value={
              (fund as FundFrequencyRecurring)[FundFields.YEARLY_INCREMENT] ||
              ''
            }
            setValue={(e) => {
              update(FundFields.YEARLY_INCREMENT, e.target.value);
            }}
          />
        )}
      </span>
      <span className="gridCol">
        <DateField
          value={
            fund[FundFields.AVAILABLE_FROM]
              ? dayjs(fund[FundFields.AVAILABLE_FROM])
              : null
          }
          onChange={(newDate) => {
            newDate &&
              newDate.isValid() &&
              update(FundFields.AVAILABLE_FROM, newDate.toISOString());
          }}
          size="small"
          variant="standard"
          format="DD/MM/YYYY"
        />
      </span>
    </div>
  );
}
