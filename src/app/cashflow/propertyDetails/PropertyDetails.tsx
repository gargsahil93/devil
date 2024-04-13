import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPropertyDetails,
  updatePropertyDetails,
} from '../lib/reducers/propertyDetailsSlice';
import { getPropertyDetails, setPropertyDetails } from './PropertyDetailsModel';
import './propertyDetails.scss';
import { PropertyDetailFields } from './types';

export default function PropertyDetails({}) {
  const propertyDetails = useSelector(selectPropertyDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePropertyDetails(getPropertyDetails()));
  }, []);

  const updateDetails = (
    key: PropertyDetailFields,
    value?: string | Dayjs | null,
  ) => {
    const newDetails = {
      ...propertyDetails,
      [key]: value,
    };
    setPropertyDetails(newDetails);
    dispatch(updatePropertyDetails({ [key]: value }));
  };

  return (
    propertyDetails && (
      <div className="propertyDetails">
        <span className="item">
          <TextField
            variant="outlined"
            label="Property name"
            name={PropertyDetailFields.NAME}
            value={propertyDetails[PropertyDetailFields.NAME] || ''}
            onChange={(e) =>
              updateDetails(PropertyDetailFields.NAME, e.target.value)
            }
          />
        </span>
        <span className="item">
          <DatePicker
            label="Booking date"
            name={PropertyDetailFields.BOOKING_DATE}
            value={
              propertyDetails[PropertyDetailFields.BOOKING_DATE]
                ? dayjs(propertyDetails[PropertyDetailFields.BOOKING_DATE])
                : null
            }
            onChange={(newDate) =>
              updateDetails(
                PropertyDetailFields.BOOKING_DATE,
                newDate ? newDate.toISOString() : '',
              )
            }
          />
        </span>
        <span className="item">
          <DatePicker
            label="Possesion date"
            name={PropertyDetailFields.POSSESION_DATE}
            onChange={(newDate) =>
              updateDetails(
                PropertyDetailFields.POSSESION_DATE,
                newDate ? newDate.toISOString() : '',
              )
            }
            value={
              propertyDetails[PropertyDetailFields.POSSESION_DATE]
                ? dayjs(propertyDetails[PropertyDetailFields.POSSESION_DATE])
                : null
            }
          />
        </span>
      </div>
    )
  );
}
