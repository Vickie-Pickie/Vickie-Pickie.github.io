import { createSlice } from '@reduxjs/toolkit';

const seats = createSlice({
  name: 'seats',
  initialState: {
    selectedSeats: [],
  },
  reducers: {
    addSeat(state, action) {
      const {
        routeId,
        coachId,
        seatNumber,
      } = action.payload;

      state.selectedSeats.push({ routeId, coachId, seatNumber });
    },

    removeSeat(state, action) {
      const {
        routeId,
        coachId,
        seatNumber,
      } = action.payload;

      const index = state.selectedSeats.findIndex((item) => item.routeId === routeId && item.coachId === coachId && item.seatNumber === seatNumber);
      if (index === -1) {
        return;
      }

      state.selectedSeats.splice(index, 1);
    },
  },
});

export default seats;
