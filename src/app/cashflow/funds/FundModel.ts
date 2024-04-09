import {
  getLocalStorage,
  setLocalStorage,
} from 'app/helpers/localStorageHelper';
import { FUND_STORAGE_KEY, FundFields, FundType } from './types';
import dayjs from 'dayjs';

export const getFunds = (): Array<FundType> => {
  const funds: Array<FundType> = getLocalStorage(FUND_STORAGE_KEY) ?? [];
  return funds.map((fund) => {
    const availableFrom = fund[FundFields.AVAILABLE_FROM];
    return {
      ...fund,
      [FundFields.AVAILABLE_FROM]: availableFrom ? dayjs(availableFrom) : null,
    };
  });
};

export const updateFundsStorage = (funds: Array<FundType>) => {
  setLocalStorage(FUND_STORAGE_KEY, funds);
};
