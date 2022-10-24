import React, {
  useState,
} from 'react';
import './TripDetails.css';
import { IconButton } from '@mui/material';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowEastIcon from '../icons/ArrowEastIcon';
import {
  formatDuration,
  getDateFromTs,
  getTimeFromTs,
} from '../../utils/date';

const TripDetails = ({ ticket }) => {
  const [departureIsOpen, setDepartureIsOpen] = useState(true);
  const [arrivalIsOpen, setArrivalIsOpen] = useState(true);

  return (
    <section className="trip-details">
      <div className="trip-details__section">
        <div className="trip-details__header">Детали поездки</div>
      </div>
      <div className="trip-details__section">
        <div className="trip-details__section-body">
          <div className="trip-details__section-title">
            <div className="trip-details__title-content">
              <div className="trip-details__title-icon">
                <ArrowRightIcon />
              </div>
              <div className="trip-details__title-label">Туда</div>
              <div className="trip-details__title-date">{getDateFromTs(ticket.departure.from.datetime)}</div>
            </div>
            <div className="trip-details__title-button">
              {
                departureIsOpen ? (
                  <IconButton onClick={() => setDepartureIsOpen(!departureIsOpen)}>
                    <IndeterminateCheckBoxOutlinedIcon />
                  </IconButton>
                )
                  : (
                    <IconButton onClick={() => setDepartureIsOpen(!departureIsOpen)}>
                      <AddBoxOutlinedIcon />
                    </IconButton>
                  )
              }
            </div>
          </div>
          {
            departureIsOpen && (
            <>
              <div className="trip-details__route-info">
                <div className="trip-details__route-info-row">
                  <span>№ Поезда</span>
                  <span className="trip-details__route-number">{ticket.departure.train.name}</span>
                </div>
                <div className="trip-details__route-info-row">
                  <span>Название</span>
                  <div className="trip-details__route-name">
                    <span>{ticket.departure.from.city.name}</span>
                    <span>{ticket.departure.to.city.name}</span>
                  </div>
                </div>
              </div>
              <div className="trip-details__route-details">
                <div className="trip-details__route-details-row">
                  <div className="trip-details__route-details-row-col">
                    <div className="trip-details__route-time">{getTimeFromTs(ticket.departure.from.datetime)}</div>
                    <div className="trip-details__route-date">{getDateFromTs(ticket.departure.from.datetime)}</div>
                  </div>
                  <div className="trip-details__route-details-row-col">
                    <div className="trip-details__route-duration">{formatDuration(ticket.departure.duration)}</div>
                    <div className="trip-details__route-arrow">
                      <ArrowEastIcon />
                    </div>
                  </div>
                  <div className="trip-details__route-details-row-col">
                    <div className="trip-details__route-time">{getTimeFromTs(ticket.departure.to.datetime)}</div>
                    <div className="trip-details__route-date">{getDateFromTs(ticket.departure.to.datetime)}</div>
                  </div>
                </div>
                <div className="trip-details__route-details-row">
                  <div className="trip-details__route-details-row-col">
                    <div className="trip-details__route-details-city">{ticket.departure.from.city.name}</div>
                    <div className="trip-details__route-details-station">{ticket.departure.from.railway_station_name}</div>
                  </div>
                  <div className="trip-details__route-details-row-col">
                    <div className="trip-details__route-details-city">{ticket.departure.to.city.name}</div>
                    <div className="trip-details__route-details-station trip-details__route-details-station_end">{ticket.departure.to.railway_station_name}</div>
                  </div>
                </div>
              </div>
            </>
            )
          }
        </div>
      </div>
      {
        ticket.arrival && (
          <div className="trip-details__section">
            <div className="trip-details__section-body">
              <div className="trip-details__section-title">
                <div className="trip-details__title-content">
                  <div className="trip-details__title-icon">
                    <ArrowLeftIcon />
                  </div>
                  <div className="trip-details__title-label">Обратно</div>
                  <div className="trip-details__title-date">{getDateFromTs(ticket.arrival.from.datetime)}</div>
                </div>
                <div className="trip-details__title-button">
                  {
                    arrivalIsOpen ? (
                      <IconButton onClick={() => setArrivalIsOpen(!arrivalIsOpen)}>
                        <IndeterminateCheckBoxOutlinedIcon />
                      </IconButton>
                    )
                      : (
                        <IconButton onClick={() => setArrivalIsOpen(!arrivalIsOpen)}>
                          <AddBoxOutlinedIcon />
                        </IconButton>
                      )
                  }
                </div>
              </div>
              {
                arrivalIsOpen && (
                  <>
                    <div className="trip-details__route-info">
                      <div className="trip-details__route-info-row">
                        <span>№ Поезда</span>
                        <span className="trip-details__route-number">{ticket.arrival.train.name}</span>
                      </div>
                      <div className="trip-details__route-info-row">
                        <span>Название</span>
                        <div className="trip-details__route-name">
                          <span>{ticket.arrival.from.city.name}</span>
                          <span>{ticket.arrival.to.city.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="trip-details__route-details">
                      <div className="trip-details__route-details-row">
                        <div className="trip-details__route-details-row-col">
                          <div className="trip-details__route-time">{getTimeFromTs(ticket.arrival.from.datetime)}</div>
                          <div className="trip-details__route-date">{getDateFromTs(ticket.arrival.from.datetime)}</div>
                        </div>
                        <div className="trip-details__route-details-row-col">
                          <div className="trip-details__route-duration">{formatDuration(ticket.arrival.duration)}</div>
                          <div className="trip-details__route-arrow">
                            <ArrowEastIcon />
                          </div>
                        </div>
                        <div className="trip-details__route-details-row-col">
                          <div className="trip-details__route-time">{getTimeFromTs(ticket.arrival.to.datetime)}</div>
                          <div className="trip-details__route-date">{getDateFromTs(ticket.arrival.to.datetime)}</div>
                        </div>
                      </div>
                      <div className="trip-details__route-details-row">
                        <div className="trip-details__route-details-row-col">
                          <div className="trip-details__route-details-city">{ticket.arrival.from.city.name}</div>
                          <div className="trip-details__route-details-station">{ticket.arrival.from.railway_station_name}</div>
                        </div>
                        <div className="trip-details__route-details-row-col">
                          <div className="trip-details__route-details-city">{ticket.arrival.to.city.name}</div>
                          <div className="trip-details__route-details-station trip-details__route-details-station_end">{ticket.arrival.to.railway_station_name}</div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        )
      }
    </section>
  );
};

export default TripDetails;
