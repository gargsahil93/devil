import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import {
  FundFields,
  FundFrequency,
  FundFrequencyRecurring,
  FundType,
} from '../types';
import NumberInput from 'app/components/NumberInput';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import './fundHead.scss';

export default function FundHead({
  fund,
  setFund,
}: {
  fund: FundType;
  setFund: (fund: FundType) => void;
}) {
  const updateFund = (
    key: FundFields,
    value: string | FundFrequency | Dayjs | null,
  ) => {
    setFund({ ...fund, [key]: value });
  };
  return (
    <div className="fundHead">
      <span className="cell">
        <TextField
          variant="outlined"
          value={fund[FundFields.NAME] || ''}
          onChange={(e) => {
            updateFund(FundFields.NAME, e.target.value);
          }}
        />
      </span>
      <span className="cell">
        <FormControl fullWidth>
          <Select
            value={fund[FundFields.FREQUENCY] ?? ''}
            onChange={(e) => {
              updateFund(FundFields.FREQUENCY, e.target.value);
            }}
          >
            <MenuItem value={FundFrequency.ONE_TIME}>One time</MenuItem>
            <MenuItem value={FundFrequency.MONTHLY}>Monthly</MenuItem>
            <MenuItem value={FundFrequency.QUARTERLY}>Quarterly</MenuItem>
            <MenuItem value={FundFrequency.HALF_YEARLY}>Half Yearly</MenuItem>
            <MenuItem value={FundFrequency.YEARLY}>Yearly</MenuItem>
          </Select>
        </FormControl>
      </span>
      <span className="cell">
        <NumberInput
          value={fund[FundFields.VALUE] || ''}
          setValue={(e) => {
            updateFund(FundFields.VALUE, e.target.value);
          }}
        />
      </span>
      <span className="cell">
        {fund[FundFields.FREQUENCY] === FundFrequency.ONE_TIME ? (
          <NumberInput
            value={fund[FundFields.INTEREST] || ''}
            setValue={(e) => {
              updateFund(FundFields.INTEREST, e.target.value);
            }}
          />
        ) : (
          <NumberInput
            value={
              (fund as FundFrequencyRecurring)[FundFields.YEARLY_INCREMENT] ||
              ''
            }
            setValue={(e) => {
              updateFund(FundFields.YEARLY_INCREMENT, e.target.value);
            }}
          />
        )}
      </span>
      <span className="cell">
        <DatePicker
          value={fund[FundFields.AVAILABLE_FROM] || null}
          onChange={(newDate) => {
            updateFund(FundFields.AVAILABLE_FROM, newDate);
          }}
        />
      </span>
    </div>
  );
}
