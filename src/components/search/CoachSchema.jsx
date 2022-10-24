import React, {
  useEffect,
  useState,
} from 'react';
import './CoachSchema.css';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BedLinenIcon from '../icons/BedLinenIcon';
import ThirdClassCoachSchema from '../coachSchemas/ThirdClassCoachSchema';
import SecondClassCoachSchema from '../coachSchemas/SecondClassCoachSchema';
import LuxClassCoachSchema from '../coachSchemas/LuxClassCoachSchema';
import SeatClassCoachSchema from '../coachSchemas/SeatClassCoachSchema';
import { formatPrice } from '../../utils/train';

const CoachSchema = ({
  coaches,
  type,
  routeId,
}) => {
  const [activeCoach, setActiveCoach] = useState(coaches[0]);

  useEffect(() => {
    setActiveCoach(coaches[0]);
  }, [coaches]);

  return (
    <div className="coach_card__coach-schema">
      <div className="coach-card__coach-nav">
        <div className="coach-card__coach-quantity">
          <div className="coach-card__coach-quantity-title">Вагоны</div>
          <ul className="coach-card__coach-quantity-list">
            {
              coaches.map((item) => {
                let itemClass = 'coach-card__coach-quantity-item';
                if (activeCoach.coach._id === item.coach._id) {
                  itemClass += ' coach_selected';
                }
                return (
                  <li
                    key={item.coach._id}
                    className={itemClass}
                    onClick={() => setActiveCoach(item)}
                  >
                    {item.coach.name}
                  </li>
                );
              })
            }
          </ul>
        </div>
        <span>Нумерация вагонов начинается с головы состава</span>
      </div>
      <div className="coach-card__schema-row">
        <div className="coach-card__schema-coach-number">
          <div>{activeCoach.coach.name}</div>
          <div>вагон</div>
        </div>
        <div className="coach-card__schema-info">
          <div className="coach-card__schema-info-col">
            <div className="coach-card__schema-info-col-row">
              <span className="coach-card__schema-info-col-row_title">Места</span>
              <span className="coach-card__schema-info-col-total">{activeCoach.coach.available_seats}</span>
            </div>
            <div className="coach-card__schema-info-col-row">
              <span className="coach-card__schema-info-col-row-seat">Верхние</span>
              <span className="coach-card__schema-info-col-row-quantity">22</span>
            </div>
            <div className="coach-card__schema-info-col-row">
              <span className="coach-card__schema-info-col-row-seat">Нижние</span>
              <span className="coach-card__schema-info-col-row-quantity">36</span>
            </div>
          </div>
          <div className="coach-card__schema-info-col">
            <div className="coach-card__schema-info-col-row">
              <span className="coach-card__schema-info-col-row_title">Стоимость</span>
            </div>
            <div className="coach-card__schema-info-col-row">
              <span className="coach-card__schema-info-col-row-price">{formatPrice(activeCoach.coach.top_price)}</span>
              <span className="coach-card__schema-info-col-row-currency">₽</span>
            </div>
            <div className="coach-card__schema-info-col-row">
              <span className="coach-card__schema-info-col-row-price">{formatPrice(activeCoach.coach.bottom_price)}</span>
              <span className="coach-card__schema-info-col-row-currency">₽</span>
            </div>
          </div>
          <div className="coach-card__schema-info-col">
            <div className="coach-card__schema-info-col-row">
              <span className="coach-card__schema-info-col-row_title">Обслуживание ФПК</span>
            </div>
            <div className="coach-card__schema-info-col-row">
              <div className="coach-card__schema-info-options">
                {
                  activeCoach.coach.have_air_conditioning && (
                    <div className="coach-card__schema-info-options-item">
                      <AcUnitIcon />
                    </div>
                  )
                }
                {
                  activeCoach.coach.have_wifi && (
                    <div className="coach-card__schema-info-options-item">
                      <WifiIcon />
                    </div>
                  )
                }
                {
                  activeCoach.coach.is_linens_included && (
                    <div className="coach-card__schema-info-options-item">
                      <BedLinenIcon />
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="schema">
        <div className="schema__pic-left"></div>
        <div className="schema__pic-middle">
          {
            type === 'first' && (
              <LuxClassCoachSchema
                availableSeats={activeCoach.seats}
                routeId={routeId}
                coachId={activeCoach.coach._id}
              />
            )
          }
          {
            type === 'second' && (
              <SecondClassCoachSchema
                availableSeats={activeCoach.seats}
                routeId={routeId}
                coachId={activeCoach.coach._id}
              />
            )
          }
          {
            type === 'third' && (
              <ThirdClassCoachSchema
                availableSeats={activeCoach.seats}
                routeId={routeId}
                coachId={activeCoach.coach._id}
              />
            )
          }
          {
            type === 'fourth' && (
              <SeatClassCoachSchema
                availableSeats={activeCoach.seats}
                routeId={routeId}
                coachId={activeCoach.coach._id}
              />
            )
          }
        </div>
        <div className="schema__pic-right"></div>
      </div>
    </div>
  );
};

export default CoachSchema;
