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
import costSlice, { selectCost } from '../lib/reducers/costSlice';
import NumberInput from 'app/components/NumberInput';
import { selectFund } from '../lib/reducers/fundSlice';

export default function Grid() {
  const dispatch = useDispatch();

  const propertyDetails = useSelector(selectPropertyDetails);
  const calendarDates = useSelector(selectCalendar);
  const costHeads = useSelector(selectCost);
  const funds = useSelector(selectFund);

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
          <>
            <div className="gridRow headerRow">
              {Object.keys(calendarDates).map((date, idx) => {
                return (
                  <div className="gridCol headerCol" key={idx}>
                    {date}
                  </div>
                );
              })}
            </div>
            {costHeads.map((cost, idx) => {
              return (
                <div className="gridRow" key={idx}>
                  {Object.keys(calendarDates).map((date, idx) => {
                    return (
                      <span className="gridCol" key={idx}>
                        <NumberInput
                          id={`${cost.id}_${date}`}
                          value=""
                          setValue={() => {}}
                        />
                      </span>
                    );
                  })}
                </div>
              );
            })}
            <div className="gridRow"></div>
            <div className="gridRow"></div>
            {funds.map((fund, idx) => {
              return (
                <div className="gridRow" key={idx}>
                  {Object.keys(calendarDates).map((date, idx) => {
                    return (
                      <span className="gridCol" key={idx}>
                        <NumberInput
                          id={`${fund.id}_${date}`}
                          value=""
                          setValue={() => {}}
                        />
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </>
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
