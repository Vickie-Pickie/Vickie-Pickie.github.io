import React, {
  useEffect,
  useRef,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import PassengerForm from '../components/passengers/PassengerForm';
import TripDetails from '../components/sidebar/TripDetails';
import TripPassengers from '../components/sidebar/TripPassengers';
import useSelectedTicket from '../hooks/useSelectedTicket';
import order from '../slices/order';
import app from '../slices/app';
import PaymentForm from '../components/passengers/PaymentForm';
import Confirmation from '../components/passengers/Confirmation';
import UIButton from '../components/ui/UIButton';

const Passengers = () => {
  const [searchParams] = useSearchParams();
  const { isFetching, data, ticket } = useSelectedTicket();
  const dispatch = useDispatch();
  const orderInfo = useSelector((state) => state.order);
  const formStep = useSelector((state) => state.app.step);
  const mainBodyRef = useRef(null);

  const handleScroll = () => {
    window.scrollTo({
      top: mainBodyRef.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const seats = searchParams.getAll('seats[]').map((item) => {
      const arr = item.split('_');
      return {
        routeId: arr[0],
        coachId: arr[1],
        seatNumber: Number(arr[2]),
      };
    });
    dispatch(order.actions.initOrder({
      departureId: searchParams.get('departure_id'),
      arrivalId: searchParams.get('arrival_id'),
      seats,
    }));
    dispatch(app.actions.setStep('passengers'));
  }, []);

  let isDisabled = false;
  orderInfo.departure.seats.forEach((item) => {
    if (!item.person_info.first_name) {
      isDisabled = true;
    }
  });

  orderInfo.arrival.seats.forEach((item) => {
    if (!item.person_info.first_name) {
      isDisabled = true;
    }
  });

  const handleNextClick = () => {
    dispatch(app.actions.setStep('payment'));
    handleScroll();
  };

  const handleBackToStep = (step) => {
    dispatch(app.actions.setStep(step));
    handleScroll();
  };

  const handlePaymentSubmit = () => {
    dispatch(app.actions.setStep('confirmation'));
    handleScroll();
  };

  if (!data || isFetching) {
    return (
      <div className="circularProgress-wrap">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <aside className="side-bar">
        <div className="side-bar__block">
          <TripDetails ticket={ticket} />
          <TripPassengers ticket={ticket} />
        </div>
      </aside>
      <section className="main-body" ref={mainBodyRef}>
        {
          formStep === 'passengers' && (
            <div className="passengers-list">
              {
                orderInfo.departure.seats.map((seat, ind) => (
                  <PassengerForm
                    seat={seat}
                    route={ticket.departure}
                    number={ind + 1}
                    key={seat.coach_id + seat.seat_number}
                  />
                ))
              }
              {
                orderInfo.arrival.seats.map((seat, ind) => (
                  <PassengerForm
                    seat={seat}
                    route={ticket.arrival}
                    number={ind + 1 + orderInfo.departure.seats.length}
                    key={seat.coach_id + seat.seat_number}
                  />
                ))
              }
              <div className="order-button-wrapper">
                <UIButton
                  type="button"
                  variant="contained"
                  disabled={isDisabled}
                  onClick={handleNextClick}
                >
                  Далее
                </UIButton>
              </div>
            </div>
          )
        }
        {
          formStep === 'payment' && <PaymentForm onPaymentSubmit={handlePaymentSubmit}/>
        }
        {
          formStep === 'confirmation' && <Confirmation onBackToStep={handleBackToStep} />
        }
      </section>
    </>
  );
};

export default Passengers;
