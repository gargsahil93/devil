import { configureStore } from '@reduxjs/toolkit';
import costReducer from 'app/cashflow/lib/reducers/costSlice';
import fundReducer from 'app/cashflow/lib/reducers/fundSlice';
import calendarReducer from 'app/cashflow/lib/reducers/calendarSlice';
import propertyDetailsReducer from 'app/cashflow/lib/reducers/propertyDetailsSlice';
import { enableMapSet } from 'immer';
export const makeStore = () => {
  enableMapSet();
  return configureStore({
    reducer: {
      cost: costReducer,
      propertyDetails: propertyDetailsReducer,
      fund: fundReducer,
      calendar: calendarReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
