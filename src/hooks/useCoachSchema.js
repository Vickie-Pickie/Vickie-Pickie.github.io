import {
  useDispatch,
  useSelector,
} from 'react-redux';
import seats from '../slices/seats';

const useCoachSchema = ({ availableSeats, routeId, coachId }) => {
  const dispatch = useDispatch();
  const selectedSeats = useSelector((state) => state.seats.selectedSeats.filter((item) => item.routeId === routeId && item.coachId === coachId));

  const isSeatAvailable = (number) => {
    const seat = availableSeats.find((item) => item.index === number);
    if (!seat) {
      return false;
    }
    return seat.available;
  };

  const isSeatSelected = (number) => {
    const idx = selectedSeats.findIndex((item) => item.seatNumber === number);
    return idx !== -1;
  };

  const onSeatSelect = (seatNumber) => {
    if (!isSeatSelected(seatNumber)) {
      dispatch(seats.actions.addSeat({
        routeId,
        coachId,
        seatNumber,
      }));
      return;
    }

    dispatch(seats.actions.removeSeat({
      routeId,
      coachId,
      seatNumber,
    }));
  };

  return {
    isSeatAvailable,
    isSeatSelected,
    onSeatSelect,
  };
};

export default useCoachSchema;
