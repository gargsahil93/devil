import { Dayjs } from 'dayjs';

export enum PropertyDetailFields {
  ID = 'id',
  NAME = 'name',
  BOOKING_DATE = 'bookingDate',
  POSSESION_DATE = 'possesionDate',
}

export type PropertyDetails = {
  [PropertyDetailFields.NAME]?: string;
  [PropertyDetailFields.ID]?: string;
  [PropertyDetailFields.BOOKING_DATE]?: Dayjs | null;
  [PropertyDetailFields.POSSESION_DATE]?: Dayjs | null;
};

export const PROPERTY_DETAILS_KEY = 'propertyDetails';
