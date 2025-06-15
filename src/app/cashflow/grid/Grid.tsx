import { useDispatch, useSelector } from 'react-redux';
import './grid.scss';
import { selectPropertyDetails } from '../reducers/propertyDetailsSlice';
import { useEffect, useState } from 'react';
import Cost from '../cost/Cost';
import Funds from '../funds/Funds';
import {
  selectCalendar,
  setInitialState,
  updateCalendarCost,
  updateCalendarDates,
} from '../reducers/calendarSlice';
import { selectCost } from '../reducers/costSlice';
import { selectFund } from '../reducers/fundSlice';
import { PaymentScheduleType } from '../types/cost';
import { IconButton, Tooltip } from '@mui/material';
import {
  CheckCircleOutline,
  DangerousOutlined,
  DoubleArrowOutlined,
} from '@mui/icons-material';
import { FundFields, FundFrequency } from '../types/fund';
import { getLocalStorage } from 'app/helpers/localStorageHelper';
import CalendarRow from '../calendarRow/CalendarRow';
import TotalCostRow from '../totalCostRow/TotalCostRow';

export default function Grid() {
  const dispatch = useDispatch();

  const propertyDetails = useSelector(selectPropertyDetails);
  const calendarDates = useSelector(selectCalendar);
  const costHeads = useSelector(selectCost);
  const funds = useSelector(selectFund);

  const [showCalendarView, setShowCalendarView] = useState(false);

  useEffect(() => {
    dispatch(setInitialState(getLocalStorage('calendar')));
  }, []);

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

  const [costMap, setCostMap] = useState<{
    [key: string]: { left: number; right: number };
  }>({});

  useEffect(() => {
    const costMap: { [id: string]: { left: number; right: number } } = {};
    costHeads.forEach((cost) => {
      costMap[cost.id] = {
        left: Number(
          ((cost.value || 0) * (1 + (cost.gst || 0) / 100)).toFixed(2),
        ),
        right: 0,
      };
    });
    funds.forEach((fund) => {
      costMap[fund.id] = {
        left: Number(fund[FundFields.VALUE]) || 0,
        right: 0,
      };
    });
    Object.values(calendarDates || {}).forEach((dateCost) => {
      Object.keys(costMap).forEach((costId) => {
        costMap[costId].right += +(dateCost[costId] || 0);
      });
    });
    setCostMap(costMap);
  }, [costHeads, funds, calendarDates]);

  return (
    <div className="grid">
      <Cost className="cost" />
      <Funds className="savings" />
      <div className="actions">
        <div className="gridRow"></div>
        {costHeads.map((cost, idx) => {
          return (
            <div className="gridRow" key={idx}>
              {costMap[cost.id]?.left === costMap[cost.id]?.right ? (
                <Tooltip title="Values match">
                  <CheckCircleOutline color="success"></CheckCircleOutline>
                </Tooltip>
              ) : (
                <Tooltip
                  title={`${costMap[cost.id].left - costMap[cost.id].right} remaining`}
                >
                  <DangerousOutlined color="warning"></DangerousOutlined>
                </Tooltip>
              )}
              {cost.paymentSchedule === PaymentScheduleType.INSTALLMENTS ? (
                <IconButton>
                  <DoubleArrowOutlined />
                </IconButton>
              ) : null}
            </div>
          );
        })}
        <div className="gridRow dummyRowAddCost"></div>
        <div className="gridRow dummyRowTotal"></div>
        <div className="gridRow dummyRowBuilderPayment"></div>
        <div className="gridRow dummyRowTDS"></div>
        <div className="gridRow"></div>
        {funds.map((fund, idx) => {
          return (
            <div className="gridRow" key={idx}>
              {costMap[fund.id]?.left === costMap[fund.id]?.right ? (
                <CheckCircleOutline color="success"></CheckCircleOutline>
              ) : (
                <DangerousOutlined color="warning"></DangerousOutlined>
              )}
              {fund[FundFields.FREQUENCY] !== FundFrequency.ONE_TIME ? (
                <IconButton>
                  <DoubleArrowOutlined />
                </IconButton>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="calendar">
        {showCalendarView ? (
          <>
            <div className="gridRow headerRow">
              {Object.keys(calendarDates).map((date, idx) => (
                <div className="gridCol headerCol" key={idx}>
                  {date}
                </div>
              ))}
            </div>
            {costHeads.map((cost, idx) => (
              <CalendarRow id={cost.id} key={idx} />
            ))}
            <div className="gridRow"></div>
            <TotalCostRow />
            <div className="gridRow"></div>
            {funds.map((fund, idx) => (
              <CalendarRow id={fund.id} key={idx} />
            ))}
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
