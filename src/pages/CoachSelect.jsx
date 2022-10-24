import React, {
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import app from '../slices/app';
import LastTicketsWidget from '../components/search/LastTicketsWidget';
import CoachItem from '../components/search/CoachItem';
import TripDetails from '../components/sidebar/TripDetails';
import useSelectedTicket from '../hooks/useSelectedTicket';
import UIButton from '../components/ui/UIButton';

const CoachSelect = () => {
  const [searchParams] = useSearchParams();
  const selectedSeats = useSelector((state) => state.seats.selectedSeats);
  const navigate = useNavigate();
  const { isFetching, data, ticket } = useSelectedTicket();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(app.actions.setStep('tickets'));
  }, []);

  const handleSeatsSelectSubmit = () => {
    selectedSeats.forEach((seat) => {
      searchParams.append('seats[]', `${seat.routeId}_${seat.coachId}_${seat.seatNumber}`);
    });
    navigate(`/passengers?${searchParams.toString()}`);
  };

  if (!data || isFetching) {
    return (
      <div className="circularProgress-wrap">
        <CircularProgress />
      </div>
    );
  }

  if (data && !ticket) {
    return (
      <div className="circularProgress-wrap">
        Запрошенный вами билет более недоступен, повторите поиск еще раз.
      </div>
    );
  }

  const isAllSeatsSelected = () => {
    if (!ticket) {
      return false;
    }

    if (selectedSeats.findIndex((item) => item.routeId === ticket.departure._id) === -1) {
      return false;
    }

    if (ticket.arrival && selectedSeats.findIndex((item) => item.routeId === ticket.arrival._id) === -1) {
      return false;
    }

    return true;
  };

  return (
    <>
      <aside className="side-bar">
        <div className="side-bar__block">
          <TripDetails ticket={ticket} />
        </div>
        <LastTicketsWidget />
      </aside>
      <section className="main-body">
        <div className="cs-title">
          Выбор мест
        </div>
        <div className="cs-list">
          <CoachItem route={ticket.departure} direction="departure"/>
          {
            ticket.arrival && <CoachItem route={ticket.arrival} direction="arrival"/>
          }
        </div>
        <div className="order-button-wrapper">
          <UIButton
            type="button"
            variant="contained"
            disabled={!isAllSeatsSelected()}
            onClick={handleSeatsSelectSubmit}
          >
            Далее
          </UIButton>
        </div>
      </section>
    </>
  );
};

export default CoachSelect;
