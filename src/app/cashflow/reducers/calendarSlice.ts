import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../lib/store';
import { CalendarDateType } from 'app/cashflow/types/calendar';
import { setLocalStorage } from 'app/helpers/localStorageHelper';
import dayjs from 'dayjs';
import { format } from 'path';

const formatDate = (date: Date) => {
  return dayjs(date).format('MMM/YYYY');
};

const initialState: { [key: string]: CalendarDateType } = {};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setInitialState: (state, { type, payload }) => {
      return payload;
    },
    updateCalendarDates: (
      state,
      {
        type,
        payload: { bookingDate, possesionDate },
      }: {
        type: string;
        payload: { bookingDate: string; possesionDate: string };
      },
    ) => {
      if (!bookingDate || !possesionDate) {
        return state;
      }
      const firstDate = new Date(bookingDate);
      const lastDate = new Date(possesionDate);
      const dateArray = [];
      let currentDate = firstDate;
      while (currentDate.getTime() <= lastDate.getTime()) {
        dateArray.push(formatDate(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
      const newState: { [key: string]: CalendarDateType } = {};
      dateArray.forEach((date) => {
        if (state[date]) {
          newState[date] = state[date];
        } else {
          newState[date] = {};
        }
      });
      setLocalStorage('calendar', newState);
      return newState;
    },
    processRecurringMoney: (
      state,
      {
        type,
        payload: { moneyHeadId, frequency, availableFrom, amount },
      }: {
        type: string;
        payload: {
          moneyHeadId: string;
          frequency: number;
          availableFrom: string;
          amount: string;
        };
      },
    ) => {
      return state;
    },
    updateCalendarCost: (
      state,
      {
        type,
        payload,
      }: { type: string; payload: { id: string; value: string; date: string } },
    ) => {
      const newState = { ...state };
      const date = formatDate(new Date(payload.date));
      newState[date] = { ...newState[date], [payload.id]: payload.value };
      setLocalStorage('calendar', newState);
      return newState;
    },
  },
});

export const { updateCalendarDates, updateCalendarCost, setInitialState } =
  calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
