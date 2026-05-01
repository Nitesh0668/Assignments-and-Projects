import { configureStore } from '@reduxjs/toolkit';
import diagnosticReducer from './diagnosticSlice';

export const store = configureStore({
  reducer: {
    diagnostics: diagnosticReducer,
  },
});
