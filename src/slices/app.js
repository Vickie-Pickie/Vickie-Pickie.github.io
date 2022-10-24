import { createSlice } from '@reduxjs/toolkit';

const app = createSlice({
  name: 'app',
  initialState: {
    step: 'tickets',
  },
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },
  }
});

export default app;
