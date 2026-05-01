import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patients: [
    { id: '1', name: 'Tushar', age: 45, proteinAnomaly: 'Low', status: 'Stable', lastScan: '2026-04-20' },
    { id: '2', name: 'Prithvi', age: 62, proteinAnomaly: 'High', status: 'Critical', lastScan: '2026-04-25' },
    { id: '3', name: 'Arun', age: 28, proteinAnomaly: 'Medium', status: 'Monitoring', lastScan: '2026-04-26' },
    { id: '4', name: 'Aakash', age: 21, proteinAnomaly: 'Medium', status: 'Critical', lastScan: '2026-04-26' },
  ],
};

const diagnosticSlice = createSlice({
  name: 'diagnostics',
  initialState,
  reducers: {
    addPatient: (state, action) => {
      state.patients.push(action.payload);
    },
    updatePatientStatus: (state, action) => {
      const { id, status } = action.payload;
      const existingPatient = state.patients.find(patient => patient.id === id);
      if (existingPatient) {
        existingPatient.status = status;
      }
    },
    deletePatient: (state, action) => {
      state.patients = state.patients.filter(patient => patient.id !== action.payload);
    }
  }
});

export const { addPatient, updatePatientStatus, deletePatient } = diagnosticSlice.actions;
export default diagnosticSlice.reducer;
