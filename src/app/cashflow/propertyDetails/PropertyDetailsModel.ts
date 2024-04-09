import {
  getLocalStorage,
  setLocalStorage,
} from 'app/helpers/localStorageHelper';
import {
  PROPERTY_DETAILS_KEY,
  PropertyDetailFields,
  PropertyDetailsType,
} from './types';
import dayjs, { Dayjs } from 'dayjs';

export const getPropertyDetails = (): PropertyDetailsType => {
  const details: PropertyDetailsType = {
    ...getLocalStorage(PROPERTY_DETAILS_KEY),
  };
  details[PropertyDetailFields.BOOKING_DATE] =
    (details[PropertyDetailFields.BOOKING_DATE] &&
      dayjs(details[PropertyDetailFields.BOOKING_DATE])) ||
    null;

  details[PropertyDetailFields.POSSESION_DATE] =
    (details[PropertyDetailFields.POSSESION_DATE] &&
      dayjs(details[PropertyDetailFields.POSSESION_DATE])) ||
    null;
  return details;
};

export const setPropertyDetails = (details: PropertyDetailsType) => {
  setLocalStorage(PROPERTY_DETAILS_KEY, details);
};
