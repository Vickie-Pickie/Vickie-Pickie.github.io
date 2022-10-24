import React from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import './TrainItem.css';
import { Button } from '@mui/material';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import EastIcon from '@mui/icons-material/East';
import WifiIcon from '@mui/icons-material/Wifi';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ArrowEastIcon from '../icons/ArrowEastIcon';
import {
  formatDuration,
  getTimeFromTs,
} from '../../utils/date';
import {
  coachType,
  formatPrice,
  minPriceForCoachType,
} from '../../utils/train';

const TrainItem = ({ item }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSelectSeats = () => {
    searchParams.append('departure_id', item.departure._id);
    if (item.arrival) {
      searchParams.append('arrival_id', item.arrival._id);
    }
    navigate(`/select-seats?${searchParams.toString()}`);
  };

  return (
    <div className="train-card">
      <div className="train-card__left">
        <div className="train-card__left-body">
          <div className="train-card__train-icon">
            <div className="train-card__icon-body">
              <DirectionsSubwayIcon sx={{
                fontSize: '60px',
              }}
              />
            </div>
            <div className="train-card__train-num">{item.departure.train.name}</div>
          </div>
          <div className="train-card__route">
            <div className="train-card__route-row">
              <div className="train-card__route-point">{item.departure.from.city.name}</div>
              <div className="train-card__route-arrow">
                <EastIcon sx={{
                  fontSize: '16px',
                }}
                />
              </div>
            </div>
            <div className="train-card__route-row">
              <div className="train-card__route-point">{item.departure.to.city.name}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="train-card__middle">
        <div className="train-card__middle-body">
          <div className="train-card__middle-row">
            <div className="train-card__middle-point">
              <div className="train-card__middle-time">{getTimeFromTs(item.departure.from.datetime)}</div>
              <div className="train-card__middle-city">{item.departure.from.city.name}</div>
              <div className="train-card__middle-station">{item.departure.from.railway_station_name}</div>
            </div>
            <div className="train-card__middle-duration">
              <div className="train-card__middle-duration-time">{formatDuration(item.departure.duration)}</div>
              <ArrowEastIcon />
            </div>
            <div className="train-card__middle-point">
              <div className="train-card__middle-time">{getTimeFromTs(item.departure.to.datetime)}</div>
              <div className="train-card__middle-city">{item.departure.to.city.name}</div>
              <div className="train-card__middle-station">{item.departure.to.railway_station_name}</div>
            </div>
          </div>
          {
            item.arrival && (
              <div className="train-card__middle-row">
                <div className="train-card__middle-point">
                  <div className="train-card__middle-time">{getTimeFromTs(item.arrival.from.datetime)}</div>
                  <div className="train-card__middle-city">{item.arrival.from.city.name}</div>
                  <div className="train-card__middle-station">{item.arrival.from.railway_station_name}</div>
                </div>
                <div className="train-card__middle-duration train-card__middle-duration_west">
                  <div className="train-card__middle-duration-time">{formatDuration(item.arrival.duration)}</div>
                  <ArrowEastIcon />
                </div>
                <div className="train-card__middle-point">
                  <div className="train-card__middle-time">{getTimeFromTs(item.arrival.to.datetime)}</div>
                  <div className="train-card__middle-city">{item.arrival.to.city.name}</div>
                  <div className="train-card__middle-station">{item.arrival.to.railway_station_name}</div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div className="train-card__right">
        <div className="train-card__right-body">
          {
            Object.keys(item.available_seats_info).map((type) => {
              return (
                <div className="train-card__right-row" key={type}>
                  <div className="train-card__right-type">{coachType(type)}</div>
                  <div className="train-card__right-quantity">{item.available_seats_info[type]}</div>
                  <div className="train-card__right-summery">
                    от
                    <span className="train-card__right-price">{formatPrice(minPriceForCoachType(item, type))}</span>
                    <span className="train-card__right-currency">₽</span>
                  </div>
                </div>
              );
            })
          }
          <div className="train-card__right-options">
            {
              (item.departure.have_wifi || item.arrival?.have_wifi) && <WifiIcon />
            }
            {
              (item.departure.is_express || item.arrival?.is_express) && <RocketLaunchIcon />
            }
            {
              (item.departure.have_air_conditioning || item.arrival?.have_air_conditioning) && <AcUnitIcon />
            }
          </div>
          <div className="train-card__right-button">
            <Button
              variant="contained"
              sx={{
                '&:hover': {
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                },
              }}
              onClick={handleSelectSeats}
            >
              Выбрать места
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainItem;
