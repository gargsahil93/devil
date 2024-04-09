import { Dayjs } from 'dayjs';

export enum FundFields {
  ID = 'id',
  NAME = 'name',
  VALUE = 'value',
  FREQUENCY = 'frequency',
  AVAILABLE_FROM = 'availableFrom',
  INTEREST = 'interest',
  YEARLY_INCREMENT = 'yearlyIncrement',
}

export enum FundFrequency {
  MONTHLY,
  QUARTERLY,
  HALF_YEARLY,
  YEARLY,
  ONE_TIME,
}

export interface BaseFundType {
  [FundFields.ID]: string;
  [FundFields.NAME]?: string;
  [FundFields.VALUE]?: string;
  [FundFields.AVAILABLE_FROM]?: Dayjs | null;
}

export interface FundFrequencyOneTime extends BaseFundType {
  [FundFields.FREQUENCY]?: FundFrequency.ONE_TIME;
  [FundFields.INTEREST]?: string;
}

export interface FundFrequencyRecurring extends BaseFundType {
  [FundFields.FREQUENCY]?:
    | FundFrequency.MONTHLY
    | FundFrequency.QUARTERLY
    | FundFrequency.HALF_YEARLY
    | FundFrequency.YEARLY;
  [FundFields.YEARLY_INCREMENT]?: string;
}

export type FundType = FundFrequencyOneTime | FundFrequencyRecurring;

export const FUND_STORAGE_KEY = 'funds';
