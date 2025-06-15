export enum LoanDetailFields {
  ID = 'id',
  NAME = 'name',
  LOAN_AMOUNT = 'loanAmount',
  TENURE = 'tenure',
  START_DATE = 'startDate',
}

export type LoanDetailsType = {
  [LoanDetailFields.ID]?: string;
  [LoanDetailFields.NAME]?: string;
  [LoanDetailFields.LOAN_AMOUNT]?: number;
  [LoanDetailFields.TENURE]?: number;
  [LoanDetailFields.START_DATE]?: string;
};

export const LOAN_DETAILS_KEY = 'loanDetails';
