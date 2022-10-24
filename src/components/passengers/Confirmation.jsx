import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Confirmation.css';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import UIButton from '../ui/UIButton';
import { useCreateOrderMutation } from '../../api/order';

const Confirmation = ({ onBackToStep }) => {
  const orderInfo = useSelector((state) => state.order);
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();

  const handleConfirmClick = async () => {
    await createOrder(orderInfo);
    const params = new URLSearchParams({
      user: `${orderInfo.user.first_name} ${orderInfo.user.patronymic}`,
      total: orderInfo.total,
    });
    navigate(`/final?${params.toString()}`);
  };

  return (
    <>
      <div className="confirmation">
        <div className="confirmation__header">Пассажиры</div>
        <div className="confirmation__body">
          <div className="confirmation__body-col confirmation__body-col_left">
            {
              orderInfo.departure.seats.map((passenger) => {
                return (
                  <div className="confirmation__body-row" key={passenger.coach_id + passenger.seat_number}>
                    <div className="confirmation__body-icon">
                      <div className="confirmation__body-icon-wrap">
                        <PersonIcon />
                      </div>
                      <p>{passenger.person_info.is_adult ? 'Взрослый' : 'Детский'}</p>
                    </div>
                    <div className="confirmation__body-content">
                      <p>
                        {
                        `${passenger.person_info.last_name} ${passenger.person_info.first_name} ${passenger.person_info.patronymic}`
                        }
                      </p>
                      <p>
                        {
                          `Пол ${passenger.person_info.gender ? 'мужской' : 'женский'}`
                        }
                      </p>
                      <p>
                        {
                          `Дата рождения ${passenger.person_info.birthday}`
                        }
                      </p>
                      <p>
                        {
                          passenger.person_info.document_type === 'passport'
                            ? `Паспорт РФ ${passenger.person_info.document_data}`
                            : `Свидетельство о рождении ${passenger.person_info.document_data}`
                        }
                      </p>
                    </div>
                  </div>
                );
              })
            }
            {
              orderInfo.arrival.seats.map((passenger) => {
                return (
                  <div className="confirmation__body-row" key={passenger.coach_id + passenger.seat_number}>
                    <div className="confirmation__body-icon">
                      <div className="confirmation__body-icon-wrap">
                        <PersonIcon />
                      </div>
                      <p>
                        {
                        passenger.person_info.is_adult ? 'Взрослый' : 'Детский'
                      }
                      </p>
                    </div>
                    <div className="confirmation__body-content">
                      <p>
                        {
                          `${passenger.person_info.last_name} ${passenger.person_info.first_name} ${passenger.person_info.patronymic}`
                        }
                      </p>
                      <p>
                        {
                          `Пол ${passenger.person_info.gender ? 'мужской' : 'женский'}`
                        }
                      </p>
                      <p>
                        {
                          `Дата рождения ${passenger.person_info.birthday}`
                        }
                      </p>
                      <p>
                        {
                          passenger.person_info.document_type === 'passport'
                            ? `Паспорт РФ ${passenger.person_info.document_data}`
                            : `Свидетельство о рождении ${passenger.person_info.document_data}`
                        }
                      </p>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className="confirmation__body-col confirmation__body-col_right">
            <div className="confirmation__body-row">
              <span>Всего</span>
              <div className="confirmation__body-row-total">
                <span className="confirmation__body-price">1240</span>
                <span className="confirmation__body-currency">₽</span>
              </div>
            </div>
            <div className="confirmation__body-row">
              <Button
                disableRipple
                type="button"
                variant="outlined"
                sx={{
                  height: '40px',
                  border: '1px solid #ffffff',
                  color: '#000',
                  backgroundColor: 'transparent',
                  borderColor: '#000',
                  '&:hover': {
                    color: '#FFA800',
                    backgroundColor: 'transparent',
                    borderColor: '#000',
                  },
                  '&:active': {
                    color: '#000',
                    backgroundColor: '#FFA800',
                    borderColor: '#FFA800',
                  },
                }}
                onClick={() => onBackToStep('passengers')}
              >
                Изменить
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="confirmation">
        <div className="confirmation__header">Способы оплаты</div>
        <div className="confirmation__body">
          <div className="confirmation__body-col confirmation__body-col_left">
            <div className="confirmation__body-row" style={{ paddingLeft: '30px' }}>
              <span>
                {
                  orderInfo.user.payment_method === 'cash' ? 'Наличными' : 'Онлайн'
              }
              </span>
            </div>
          </div>
          <div className="confirmation__body-col confirmation__body-col_right">
            <div className="confirmation__body-row">
              <Button
                type="button"
                variant="outlined"
                sx={{
                  height: '40px',
                  border: '1px solid #ffffff',
                  color: '#000',
                  backgroundColor: 'transparent',
                  borderColor: '#000',
                  '&:hover': {
                    color: '#FFA800',
                    backgroundColor: 'transparent',
                    borderColor: '#000',
                  },
                  '&:active': {
                    color: '#000',
                    backgroundColor: '#FFA800',
                    borderColor: '#FFA800',
                  },
                }}
                onClick={() => onBackToStep('payment')}
              >
                Изменить
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="order-button-wrapper">
        <UIButton
          type="submit"
          variant="contained"
          onClick={handleConfirmClick}
        >
          Подтвердить
        </UIButton>
      </div>
    </>
  );
};

export default Confirmation;
