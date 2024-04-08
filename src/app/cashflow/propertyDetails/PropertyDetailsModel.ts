import {
  getLocalStorage,
  setLocalStorage,
} from 'app/helpers/localStorageHelper';
import {
  PROPERTY_DETAILS_KEY,
  PropertyDetailFields,
  PropertyDetails,
} from './types';
import dayjs, { Dayjs } from 'dayjs';

export const getPropertyDetails = (): PropertyDetails => {
  const details: PropertyDetails = getLocalStorage(PROPERTY_DETAILS_KEY);
  details[PropertyDetailFields.BOOKING_DATE] = dayjs(
    details[PropertyDetailFields.BOOKING_DATE],
  );

  details[PropertyDetailFields.POSSESION_DATE] = dayjs(
    details[PropertyDetailFields.POSSESION_DATE],
  );
  return details;
};

export const setPropertyDetails = (details: PropertyDetails) => {
  setLocalStorage(PROPERTY_DETAILS_KEY, details);
};
