export enum PropertyDetailFields {
  ID = 'id',
  NAME = 'name',
  BOOKING_DATE = 'bookingDate',
  POSSESION_DATE = 'possesionDate',
}

export type PropertyDetailsType = {
  [PropertyDetailFields.NAME]?: string;
  [PropertyDetailFields.ID]?: string;
  [PropertyDetailFields.BOOKING_DATE]?: string;
  [PropertyDetailFields.POSSESION_DATE]?: string;
};

export const PROPERTY_DETAILS_KEY = 'propertyDetails';
