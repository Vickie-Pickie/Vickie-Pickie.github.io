import React, { useState, useEffect } from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import './Index.css';
import './FinalPage.css';
import {
  Button,
  IconButton,
} from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import HeaderMenu from '../components/HeaderMenu';
import HeaderLogo from '../components/HeaderLogo';
import Footer from '../components/Footer';
import DisplayTicketIcon from '../components/icons/DisplayTicketIcon';
import TicketsIcon from '../components/icons/TicketsIcon';
import OfficerIcon from '../components/icons/OfficerIcon';
import { formatPrice } from '../utils/train';

const FinalPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [tmpRating, setTmpRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(searchParams.get('user'));
    setTotalPrice(Number(searchParams.get('total')));
  }, []);

  const handleGoMainClick = () => {
    setIsActive(!isActive);
    navigate('/');
  };

  return (
    <div>
      <header className="final-page-header">
        <HeaderLogo />
        <HeaderMenu />
      </header>
      <main>
        <div className="order-wrapper">
          <div className="order-title">Благодарим вас за заказ!</div>
          <div className="order">
            <div className="order__header">
              <div className="order__number">
                <span>№Заказа</span>
                <span>285AA</span>
              </div>
              <div className="order__price">
                <span>сумма</span>
                <span>{formatPrice(totalPrice)}</span>
                <span>Р</span>
              </div>
            </div>
            <div className="order__info">
              <div className="order__info-wrapper">
                <div className="order__icon-wrapper">
                  <div className="order__icon">
                    <DisplayTicketIcon />
                  </div>
                  <div className="order__icon-text">билеты будут отправлены на ваш e-mail</div>
                </div>
                <div className="order__icon-wrapper">
                  <div className="order__icon">
                    <TicketsIcon />
                  </div>
                  <div className="order__icon-text">распечатайте и сохраняйте билеты до даты поездки</div>
                </div>
                <div className="order__icon-wrapper">
                  <div className="order__icon">
                    <OfficerIcon />
                  </div>
                  <div className="order__icon-text">предъявите распечатанные билеты при посадке</div>
                </div>
              </div>
            </div>
            <div className="order__content">
              <p>{userName}!</p>
              <p>Ваш заказ успешно оформлен</p>
              <p>В ближайшее время с вами свяжется наш оператор для подтверждения</p>
              <p>Благодарим Вас за оказанное доверие и желаем приятного путешествия!</p>
            </div>
            <div className="order__footer">
              <div className="order__rating">
                <span>Оцените наш сервис</span>
                {
                  Array.from({ length: 5 }).map((item, ind) => (
                    <div key={ind} className="order__star">
                      <IconButton
                        size="large"
                        sx={{
                          '& .MuiSvgIcon-root': {
                            color: '#fff',
                          },
                          '&:hover': {
                            '& .MuiSvgIcon-root': {
                              color: '#fff',
                            },
                          },
                        }}
                        onClick={() => setRating(ind + 1)}
                        onMouseOver={() => setTmpRating(ind + 1)}
                        onMouseOut={() => setTmpRating(0)}
                      >
                        {
                          ind < tmpRating || (ind < rating && tmpRating === 0)
                            ? <StarIcon fontSize="large"/>
                            : <StarBorderOutlinedIcon fontSize="large"/>
                        }
                      </IconButton>
                    </div>
                  ))
                }
              </div>
              <div className="order__button">
                <Button
                  type="button"
                  variant="outlined"
                  sx={{
                    height: '40px',
                    border: '1px solid #ffffff',
                    color: '#000',
                    backgroundColor: isActive ? '#fff' : 'transparent',
                    borderColor: '#000',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      borderColor: '#000',
                      color: '#000',
                    },
                  }}
                  onClick={handleGoMainClick}
                >
                  Вернуться на главную
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default FinalPage;
