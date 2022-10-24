import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  CircularProgress,
  IconButton,
} from '@mui/material';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { useLazyGetSeatsQuery } from '../../api/routes';
import {
  calcSeatPrice,
  formatPrice,
} from '../../utils/train';
import { morph } from '../../utils/date';
import order from '../../slices/order';

const TripPassengers = ({ ticket }) => {
  const dispatch = useDispatch();
  const [fetchDepartureSeats, { data: departureData, isFetching: isDepartureFetching }] = useLazyGetSeatsQuery();
  const [fetchArrivalSeats, { data: arrivalData, isFetching: isArrivalFetching }] = useLazyGetSeatsQuery();
  const [isOpen, setIsOpen] = useState(true);
  const orderInfo = useSelector((state) => state.order);

  useEffect(() => {
    fetchDepartureSeats(ticket.departure._id);

    if (ticket.arrival) {
      fetchArrivalSeats(ticket.arrival._id);
    }
  }, []);

  const { adults = null, children = null, totalPrice = 0 } = useMemo(() => {
    if (!departureData || isDepartureFetching || isArrivalFetching) {
      return {};
    }

    const res = {
      adults: {
        count: 0,
        price: 0,
      },
      children: {
        count: 0,
        price: 0,
      },
      totalPrice: 0,
    };

    const calcTotalPrices = (route, coachList) => {
      route.seats.forEach((seat) => {
        const coachItem = coachList.find((item) => item.coach._id === seat.coach_id);
        const price = calcSeatPrice(coachItem.coach, seat.seat_number, seat.is_child);

        if (seat.is_child) {
          res.children.count += 1;
          res.children.price += price;
        } else {
          res.adults.count += 1;
          res.adults.price += price;
        }
      });
    };

    calcTotalPrices(orderInfo.departure, departureData);
    calcTotalPrices(orderInfo.arrival, arrivalData);

    res.totalPrice = res.adults.price + res.children.price;
    dispatch(order.actions.setTotal(res.totalPrice));

    return res;
  }, [departureData, arrivalData, orderInfo]);

  if (!departureData || isDepartureFetching || isArrivalFetching) {
    return <CircularProgress/>;
  }

  return (
    <>
      <div className="trip-details__section">
        <div className="trip-details__section-body">
          <div className="trip-details__section-title">
            <div className="trip-details__title-content">
              <div className="trip-details__title-icon">
                <PersonIcon />
              </div>
              <div className="trip-details__title-label">Пассажиры</div>
            </div>
            <div className="trip-details__title-button">
              {
                isOpen ? (
                  <IconButton
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <IndeterminateCheckBoxOutlinedIcon />
                  </IconButton>
                )
                  : (
                    <IconButton
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <AddBoxOutlinedIcon />
                    </IconButton>
                  )
              }
            </div>
          </div>
          {
            isOpen && (
              <>
                {
                  adults?.count > 0 && (
                    <div className="trip-details__passengers-row">
                      <div className="trip-details__passengers-quantity">{ morph(adults?.count, ['Взрослый', 'Взрослых'])}</div>
                      <div className="trip-details__passengers-price">
                        <div className="trip-details__passengers-price-num">{ formatPrice(adults?.price) }</div>
                        <div className="trip-details__passengers-price-currency">₽</div>
                      </div>
                    </div>
                  )
                }
                {
                  children?.count > 0 && (
                    <div className="trip-details__passengers-row">
                      <div className="trip-details__passengers-quantity">{ morph(children?.count, ['Ребенок', 'Ребенка', 'Детей'])}</div>
                      <div className="trip-details__passengers-price">
                        <div className="trip-details__passengers-price-num">{ formatPrice(children?.price) }</div>
                        <div className="trip-details__passengers-price-currency">₽</div>
                      </div>
                    </div>
                  )
                }
              </>
            )
          }
        </div>
      </div>
      <div className="trip-details__section">
        <div className="trip-details__footer">
          <span>итог</span>
          <div className="trip-details__footer-price">
            <div className="trip-details__footer-price-total">{ formatPrice(totalPrice) }</div>
            <div className="trip-details__footer-price-currency">₽</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripPassengers;
