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
import { PropertyDetailFields } from '../types/propertyDetails';

export default function PropertyDetails({}) {
  const propertyDetails = useSelector(selectPropertyDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePropertyDetails(getPropertyDetails()));
  }, [dispatch]);

  const updateDetails = (key: PropertyDetailFields, value?: string | null) => {
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
            id="propertyName"
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
            onChange={(newDate) => {
              if (!newDate)
                updateDetails(PropertyDetailFields.BOOKING_DATE, '');
              if (newDate?.isValid())
                updateDetails(
                  PropertyDetailFields.BOOKING_DATE,
                  newDate.toISOString(),
                );
            }}
            format="DD/MM/YYYY"
          />
        </span>
        <span className="item">
          <DatePicker
            label="Possesion date"
            name={PropertyDetailFields.POSSESION_DATE}
            onChange={(newDate) => {
              if (!newDate)
                updateDetails(PropertyDetailFields.POSSESION_DATE, '');
              if (newDate?.isValid())
                updateDetails(
                  PropertyDetailFields.POSSESION_DATE,
                  newDate.toISOString(),
                );
            }}
            value={
              propertyDetails[PropertyDetailFields.POSSESION_DATE]
                ? dayjs(propertyDetails[PropertyDetailFields.POSSESION_DATE])
                : null
            }
            format="DD/MM/YYYY"
          />
        </span>
      </div>
    )
  );
}
