import { useDispatch, useSelector } from 'react-redux';
import './grid.scss';
import { selectPropertyDetails } from '../lib/reducers/propertyDetailsSlice';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { selectCost, updateCost } from '../lib/reducers/costSlice';
import { getCostHeads } from 'app/initialData/costHeads';
import CostHead from '../costHead/CostHead';
import Cost from '../cost/Cost';
import Funds from '../funds/Funds';

const dateToString = (date: Date) => {
  return date.toLocaleDateString();
};

export default function Grid() {
  const dispatch = useDispatch();

  const propertyDetails = useSelector(selectPropertyDetails);
  const cost = useSelector(selectCost);

  const [showCalendarView, setShowCalendarView] = useState(false);
  const [targetDates, setTargetDates] = useState<Array<string>>([]);

  useEffect(() => {
    dispatch(updateCost(getCostHeads()));
  }, [dispatch]);

  useEffect(() => {
    setShowCalendarView(
      !!(propertyDetails.bookingDate && propertyDetails.possesionDate),
    );
  }, [propertyDetails]);

  useEffect(() => {
    if (showCalendarView) {
      const firstDate = new Date(propertyDetails.bookingDate);
      const lastDate = new Date(propertyDetails.possesionDate);
      const dateArray = [];
      let currentDate = firstDate;
      while (currentDate.getTime() <= lastDate.getTime()) {
        dateArray.push(dateToString(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
      setTargetDates(dateArray);
    }
  }, [showCalendarView, propertyDetails]);

  return (
    <div className="grid">
      <Cost className="cost" />
      <Funds className="savings" />
      <div className="calendar">
        {showCalendarView ? (
          <div className="gridRow headerRow">
            {targetDates.map((date, idx) => {
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
