import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import './propertyDetails.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { PropertyDetailFields, PropertyDetails } from './types';
import { getPropertyDetails, setPropertyDetails } from './PropertyDetailsModel';
import { Dayjs } from 'dayjs';

export default () => {
  const [details, setDetails] = useState<PropertyDetails>();
  useEffect(() => {
    setDetails(getPropertyDetails());
  }, []);

  const updateDetails = (
    key: PropertyDetailFields,
    value?: string | Dayjs | null,
  ) => {
    setDetails((details) => {
      const newDetails = {
        ...details,
        [key]: value,
      };
      setPropertyDetails(newDetails);
      return newDetails;
    });
  };

  return (
    <div className="propertyDetails">
      <span className="item">
        <TextField
          variant="outlined"
          label="Property name"
          name={PropertyDetailFields.NAME}
          value={details && details[PropertyDetailFields.NAME]}
          defaultValue="."
          onChange={(e) =>
            updateDetails(PropertyDetailFields.NAME, e.target.value)
          }
        />
      </span>
      <span className="item">
        <DatePicker
          label="Booking date"
          name={PropertyDetailFields.BOOKING_DATE}
          value={details && details[PropertyDetailFields.BOOKING_DATE]}
          onChange={(newDate) =>
            updateDetails(PropertyDetailFields.BOOKING_DATE, newDate)
          }
        />
      </span>
      <span className="item">
        <DatePicker
          label="Possesion date"
          name={PropertyDetailFields.POSSESION_DATE}
          onChange={(newDate) =>
            updateDetails(PropertyDetailFields.POSSESION_DATE, newDate)
          }
          value={details && details[PropertyDetailFields.POSSESION_DATE]}
        />
      </span>
    </div>
  );
};
