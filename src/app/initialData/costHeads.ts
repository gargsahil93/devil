import { CostHeadType, PaymentScheduleType } from 'app/cashflow/types/cost';
import {
  getLocalStorage,
  setLocalStorage,
} from 'app/helpers/localStorageHelper';

const costData: Array<CostHeadType> = [
  {
    id: '1',
    label: 'Base',
    gst: 5,
    paymentSchedule: PaymentScheduleType.INSTALLMENTS,
    tdsApplicable: true,
  },
  {
    id: '2',
    label: 'External development charges',
    gst: 5,
    paymentSchedule: PaymentScheduleType.ONE_TIME,
    tdsApplicable: true,
  },
  {
    id: '3',
    label: 'Internal Development charges',
    gst: 5,
    paymentSchedule: PaymentScheduleType.ONE_TIME,
    tdsApplicable: true,
  },
  {
    id: '4',
    label: 'Club house charges',
    gst: 5,
    paymentSchedule: PaymentScheduleType.ONE_TIME,
    tdsApplicable: true,
  },
  {
    id: '5',
    label: 'Corpus Fund',
    gst: 0,
    paymentSchedule: PaymentScheduleType.ONE_TIME,
    tdsApplicable: false,
  },
  {
    id: '6',
    label: 'Advance Maintainence',
    gst: 18,
    paymentSchedule: PaymentScheduleType.ONE_TIME,
    tdsApplicable: false,
  },
];

export const initCostHeads = () => {
  if (!getLocalStorage('costHeads')) {
    setLocalStorage('costHeads', costData);
  }
};

export const resetCostHeads = () => {
  setLocalStorage('costHeads', costData);
};

export const getCostHeads = () => {
  return getLocalStorage('costHeads');
};

export const setCostHeads = (costHeads: Array<CostHeadType>) => {
  setLocalStorage('costHeads', costHeads);
};

export const addNewCostHead = (costHead: CostHeadType) => {
  let storageCostHeads: Array<CostHeadType> = getCostHeads() || [];
  if (!storageCostHeads) {
    setCostHeads([...storageCostHeads, costHead]);
  }
};
