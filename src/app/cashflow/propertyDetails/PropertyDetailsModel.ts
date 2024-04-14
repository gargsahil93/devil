import {
  getLocalStorage,
  setLocalStorage,
} from 'app/helpers/localStorageHelper';
import {
  PROPERTY_DETAILS_KEY,
  PropertyDetailsType,
} from '../types/propertyDetails';

export const getPropertyDetails = (): PropertyDetailsType => {
  const details: PropertyDetailsType = {
    ...getLocalStorage(PROPERTY_DETAILS_KEY),
  };
  return details;
};

export const setPropertyDetails = (details: PropertyDetailsType) => {
  setLocalStorage(PROPERTY_DETAILS_KEY, details);
};
