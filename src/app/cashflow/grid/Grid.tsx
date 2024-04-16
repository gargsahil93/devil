import { useDispatch, useSelector } from 'react-redux';
import './grid.scss';
import { selectPropertyDetails } from '../lib/reducers/propertyDetailsSlice';
import { useEffect, useState } from 'react';
import Cost from '../cost/Cost';
import Funds from '../funds/Funds';
import {
  selectCalendar,
  updateCalendarDates,
} from '../lib/reducers/calendarSlice';

export default function Grid() {
  const dispatch = useDispatch();

  const propertyDetails = useSelector(selectPropertyDetails);
  const calendarDates = useSelector(selectCalendar);

  const [showCalendarView, setShowCalendarView] = useState(false);

  useEffect(() => {
    setShowCalendarView(
      !!(propertyDetails.bookingDate && propertyDetails.possesionDate),
    );
  }, [propertyDetails]);

  useEffect(() => {
    if (showCalendarView) {
      dispatch(
        updateCalendarDates({
          possesionDate: propertyDetails.possesionDate,
          bookingDate: propertyDetails.bookingDate,
        }),
      );
    }
  }, [showCalendarView, propertyDetails]);

  return (
    <div className="grid">
      <Cost className="cost" />
      <Funds className="savings" />
      <div className="calendar">
        {showCalendarView ? (
          <div className="gridRow headerRow">
            {Object.keys(calendarDates).map((date, idx) => {
              return (
                <div className="gridCol headerCol" key={idx}>
                  {date}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            Please enter Booking date and Possesion date to see the calendar
            view.
          </div>
        )}
      </div>
    </div>
  );
}
