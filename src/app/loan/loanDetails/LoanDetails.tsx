import { LoanDetailFields } from '../types/loanDetails';
import { useEffect } from 'react';
import './loanDetails.scss';
import NumberInput from 'app/components/NumberInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoanDetails,
  updateLoanDetails,
} from '../reducers/loanDetailsSlice';
import { getLoanDetails } from './LoanDetailModel';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export default function LoanDetails() {
  const loanDetails = useSelector(selectLoanDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateLoanDetails(getLoanDetails()));
  }, [dispatch]);

  const updateDetails = (key: LoanDetailFields, value?: string | null) => {
    dispatch(updateLoanDetails({ [key]: value }));
  };
  return (
    <div className="loanDetails">
      <NumberInput
        id="loanAmount"
        value={loanDetails.loanAmount}
        setValue={(val) =>
          updateDetails(LoanDetailFields.LOAN_AMOUNT, val.target.value)
        }
        name={LoanDetailFields.NAME}
        label="Loan Amount"
        onlyEdit
      />
      <NumberInput
        id="tenure"
        value={loanDetails.tenure}
        setValue={(val) =>
          updateDetails(LoanDetailFields.TENURE, val.target.value)
        }
        name={LoanDetailFields.TENURE}
        label="Tenure"
        onlyEdit
      />
      <DatePicker
        label="Loan Start Date"
        name={LoanDetailFields.START_DATE}
        value={
          loanDetails[LoanDetailFields.START_DATE]
            ? dayjs(loanDetails[LoanDetailFields.START_DATE])
            : null
        }
        onChange={(newDate) => {
          if (!newDate) updateDetails(LoanDetailFields.START_DATE, '');
          if (newDate?.isValid())
            updateDetails(LoanDetailFields.START_DATE, newDate.toISOString());
        }}
        format="DD/MM/YYYY"
        views={['day', 'month', 'year']}
      />
    </div>
  );
}
