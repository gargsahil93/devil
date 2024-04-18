import { useDispatch, useSelector } from 'react-redux';
import './grid.scss';
import { selectPropertyDetails } from '../lib/reducers/propertyDetailsSlice';
import { useEffect, useState } from 'react';
import Cost from '../cost/Cost';
import Funds from '../funds/Funds';
import {
  selectCalendar,
  setInitialState,
  updateCalendarCost,
  updateCalendarDates,
} from '../lib/reducers/calendarSlice';
import costSlice, { selectCost } from '../lib/reducers/costSlice';
import NumberInput from 'app/components/NumberInput';
import { selectFund } from '../lib/reducers/fundSlice';
import { PaymentScheduleType } from '../types/cost';
import { IconButton, Tooltip } from '@mui/material';
import {
  CheckCircleOutline,
  DangerousOutlined,
  DoubleArrowOutlined,
} from '@mui/icons-material';
import { FundFields, FundFrequency } from '../types/fund';
import { getLocalStorage } from 'app/helpers/localStorageHelper';

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
    Object.values(calendarDates).forEach((dateCost) => {
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
                <Tooltip title="Put values correctly">
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
        <div className="gridRow"></div>
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
                          value={calendarDates[date]?.[cost.id] || ''}
                          setValue={(e) => {
                            dispatch(
                              updateCalendarCost({
                                date,
                                id: cost.id,
                                value: e.target.value,
                              }),
                            );
                          }}
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
                          setValue={(e) => {
                            dispatch(
                              updateCalendarCost({
                                date,
                                id: fund.id,
                                value: e.target.value,
                              }),
                            );
                          }}
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
