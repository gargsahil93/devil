import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CalendarDateType } from 'app/cashflow/types/calendar';

const initialState: { [key: string]: CalendarDateType } = {};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    updateCalendarDates: (
      state,
      {
        type,
        payload,
      }: {
        type: string;
        payload: { bookingDate: string; possesionDate: string };
      },
    ) => {
      const firstDate = new Date(payload.bookingDate);
      const lastDate = new Date(payload.possesionDate);
      const dateArray = [];
      let currentDate = firstDate;
      while (currentDate.getTime() <= lastDate.getTime()) {
        dateArray.push(currentDate.toLocaleDateString());
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
      return newState;
    },
  },
});

export const { updateCalendarDates } = calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
