import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  Button,
  IconButton,
} from '@mui/material';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
import EastIcon from '@mui/icons-material/East';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CircularProgress from '@mui/material/CircularProgress';
import StarIcon from '@mui/icons-material/Star';
import './CoachItem.css';
import {
  formatDurationText,
  getTimeFromTs,
  morph,
} from '../../utils/date';
import { useLazyGetSeatsQuery } from '../../api/routes';
import CoachSchema from './CoachSchema';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import SeatIcon from '../icons/SeatIcon';
import ThirdClassSleeperIcon from '../icons/ThirdClassSleeperIcon';
import SecondClassSleeperIcon from '../icons/SecondClassSleeperIcon';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

const CoachItem = ({
  route,
  direction,
}) => {
  const [fetchSeats, { data, isFetching }] = useLazyGetSeatsQuery();
  const [selectedCoachType, setSelectedCoachType] = useState(null);
  const duration = formatDurationText(route.duration);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSeats(route._id);
  }, []);

  const selectedCoaches = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.filter((item) => item.coach.class_type === selectedCoachType);
  }, [selectedCoachType, data]);

  const handleGoBack = () => {
    navigate(`/search-results?${searchParams.toString()}`);
  };

  let coachCardNavCLass = 'coach-card__nav';

  if (direction === 'arrival') {
    coachCardNavCLass += ' coach-card__nav_arrival';
  }

  return (
    <div className="coach-card">
      <div className={coachCardNavCLass}>
        <div className="coach-card__arrow">
          {
            direction === 'departure' ? <ArrowRightIcon /> : <ArrowLeftIcon />
          }
        </div>
        <div className="coach-card__button">
          <Button
            variant="contained"
            sx={{
              width: '227px',
              '&:hover': {
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              },
            }}
            onClick={handleGoBack}
          >
            Выбрать другой поезд
          </Button>
        </div>
      </div>
      <div className="coach-card__route">
        <div className="coach-card__route-left">
          <div className="coach-card__route-icon coach-card__route-icon_border">
            <DirectionsSubwayIcon sx={{
              fontSize: '16px',
            }}
            />
          </div>
          <div className="coach-card__route-train">
            <div className="coach-card__route-number">{route.train.name}</div>
            <div className="coach-card__route-row">
              <div className="coach-card__route-point">{route.from.city.name}</div>
              <div className="coach-card__route-arrow">
                <EastIcon sx={{
                  fontSize: '14px',
                }}
                />
              </div>
            </div>
            <div className="coach-card__route-row">
              <div className="coach-card__route-point">{route.to.city.name}</div>
              <div className="coach-card__route-arrow">
                <EastIcon sx={{
                  fontSize: '14px',
                }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="coach-card__route-middle">
          <div className="coach-card__route-middle-point">
            <div className="coach-card__route-middle-time">{getTimeFromTs(route.from.datetime)}</div>
            <div className="coach-card__route-middle-city">{route.from.city.name}</div>
            <div className="coach-card__route-middle-station">{route.from.railway_station_name}</div>
          </div>
          <div className="coach-card__route-middle-arrow">
            <ArrowRightIcon />
          </div>
          <div className="coach-card__route-middle-point">
            <div className="coach-card__route-middle-time">{getTimeFromTs(route.to.datetime)}</div>
            <div className="coach-card__route-middle-city">{route.to.city.name}</div>
            <div className="coach-card__route-middle-station">{route.to.railway_station_name}</div>
          </div>
        </div>
        <div className="coach-card__route-right">
          <div className="coach-card__route-icon">
            <AccessTimeIcon />
          </div>
          <div className="coach-card__route-duration">
            <div>{morph(duration[0], ['час', 'часа', 'часов'])}</div>
            <div>{morph(duration[1], ['минута', 'минуты', 'минут'])}</div>
          </div>
        </div>
      </div>
      {
        !data || isFetching
          ? <CircularProgress />
          : (
            <>
              <div className="coach_card__coach-type">
                <div className="coach_card__coach-type-title">Тип вагона</div>
                <div className="coach_card__coach-types-body">
                  <div className="coach_card__coach-type-item">
                    <IconButton
                      sx={{
                        '&:hover path, &.MuiIconButton-colorPrimary path': {
                          fill: '#FFA800',
                        },
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                        '&.Mui-disabled': {
                          opacity: 0.5,
                        },
                      }}
                      disabled={!data.find((item) => item.coach.class_type === 'fourth')}
                      onClick={() => setSelectedCoachType('fourth')}
                      color={selectedCoachType === 'fourth' ? 'primary' : 'default'}
                    >
                      <SeatIcon />
                    </IconButton>
                    <div className="coach_card__coach-type-label">Сидячий</div>
                  </div>
                  <div className="coach_card__coach-type-item">
                    <IconButton
                      sx={{
                        '&:hover path, &.MuiIconButton-colorPrimary path': {
                          fill: '#FFA800',
                        },
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                        '&.Mui-disabled': {
                          opacity: 0.5,
                        },
                      }}
                      disabled={!data.find((item) => item.coach.class_type === 'second')}
                      onClick={() => setSelectedCoachType('second')}
                      color={selectedCoachType === 'second' ? 'primary' : 'default'}
                    >
                      <SecondClassSleeperIcon />
                    </IconButton>
                    <div className="coach_card__coach-type-label">Купэ</div>
                  </div>
                  <div className="coach_card__coach-type-item">
                    <IconButton
                      sx={{
                        '&:hover path, &.MuiIconButton-colorPrimary path': {
                          fill: '#FFA800',
                        },
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                        '&.Mui-disabled': {
                          opacity: 0.5,
                        },
                      }}
                      disabled={!data.find((item) => item.coach.class_type === 'third')}
                      onClick={() => setSelectedCoachType('third')}
                      color={selectedCoachType === 'third' ? 'primary' : 'default'}
                    >
                      <ThirdClassSleeperIcon />
                    </IconButton>
                    <div className="coach_card__coach-type-label">Плацкарт</div>
                  </div>
                  <div className="coach_card__coach-type-item">
                    <IconButton
                      sx={{
                        color: '#E5E5E5',
                        '&:hover path, &.MuiIconButton-colorPrimary path': {
                          color: '#FFA800',
                        },
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                        '&.Mui-disabled': {
                          opacity: 0.5,
                          color: '#E5E5E5',
                        },
                      }}
                      disabled={!data.find((item) => item.coach.class_type === 'first')}
                      onClick={() => setSelectedCoachType('first')}
                      color={selectedCoachType === 'first' ? 'primary' : 'default'}
                    >
                      <StarIcon />
                    </IconButton>
                    <div className="coach_card__coach-type-label">Люкс</div>
                  </div>
                </div>
              </div>
              {
                selectedCoachType && (
                  <CoachSchema
                    coaches={selectedCoaches}
                    type={selectedCoachType}
                    routeId={route._id}
                  />
                )
              }
            </>
          )
      }
    </div>
  );
};

export default CoachItem;
