import {
  getLocalStorage,
  setLocalStorage,
} from 'app/helpers/localStorageHelper';
import { LOAN_DETAILS_KEY, LoanDetailsType } from '../types/loanDetails';

export const getLoanDetails = () =>
  ({ ...getLocalStorage(LOAN_DETAILS_KEY) }) as LoanDetailsType;

export const setLoanDetails = (details: LoanDetailsType) =>
  setLocalStorage(LOAN_DETAILS_KEY, details);
