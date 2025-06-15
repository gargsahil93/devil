import { configureStore } from '@reduxjs/toolkit';
import costReducer from 'app/cashflow/reducers/costSlice';
import fundReducer from 'app/cashflow/reducers/fundSlice';
import calendarReducer from 'app/cashflow/reducers/calendarSlice';
import propertyDetailsReducer from 'app/cashflow/reducers/propertyDetailsSlice';
import loanDetailsReducer from 'app/loan/reducers/loanDetailsSlice';
import { enableMapSet } from 'immer';
export const makeStore = () => {
  enableMapSet();
  return configureStore({
    reducer: {
      cost: costReducer,
      propertyDetails: propertyDetailsReducer,
      fund: fundReducer,
      calendar: calendarReducer,
      loanDetails: loanDetailsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
