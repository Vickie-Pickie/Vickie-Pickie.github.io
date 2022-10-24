import React, {
  useState,
  useRef,
} from 'react';
import {
  Button,
} from '@mui/material';
import './Index.css';
import DisplayIcon from '../components/icons/DisplayIcon';
import OfficeIcon from '../components/icons/OfficeIcon';
import GlobesIcon from '../components/icons/GlobesIcon';
import SearchForm from '../components/search/SearchForm';
import HeaderMenu from '../components/HeaderMenu';
import HeaderLogo from '../components/HeaderLogo';
import Footer from '../components/Footer';
import Slider from '../components/ui/Slider';

const Index = () => {
  const [isClicked, setIsClicked] = useState(false);
  const aboutRef = useRef(null);
  const howItWorksRef = useRef(null);
  const feedbackRef = useRef(null);
  const contactsRef = useRef(null);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <header className="index-header">
        <HeaderLogo />
        <HeaderMenu
          aboutRef={aboutRef}
          howItWorksRef={howItWorksRef}
          feedbackRef={feedbackRef}
          contactsRef={contactsRef}
        />
        <div className="index-header-form">
          <div className="wrapper">
            <div className="index-header-content">
              <div className="index-header__slogan">
                Вся жизнь  —
                <b> путешествие!</b>
              </div>
              <SearchForm />
            </div>
          </div>
        </div>
      </header>
      <div className="row"></div>
      <main>
        <section className="about" id="#about" ref={aboutRef}>
          <div className="wrapper">
            <div className="about__title">
              О НАС
            </div>
            <div className="about__content">
              <p className="about__paragraph">
                Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем
                все больше людей заказывают жд билеты через интернет.
              </p>
              <p className="about__paragraph">
                Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать?
                Мы расскажем о преимуществах заказа через интернет.
              </p>
              <p className="about__paragraph">
                Покупать жд билеты дешево можно за 90 суток до отправления поезда.
                Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
              </p>
            </div>
          </div>
        </section>
        <section className="how-it-works" id="/#how-it-works" ref={howItWorksRef}>
          <div className="wrapper">
            <div className="how-it-works__header">
              <div className="how-it-works__title">КАК ЭТО РАБОТАЕТ</div>
              <div className="how-it-works__button">
                <Button
                  variant="outlined"
                  sx={{
                    width: '227px',
                    border: '1px solid #ffffff',
                    color: isClicked ? '#000000' : '#ffffff',
                    backgroundColor: isClicked ? '#FFFFFF' : 'transparent',
                    '&:hover': {
                      color: '#000000',
                      backgroundColor: '#FFCA62',
                      borderColor: '#FFCA62',
                    },
                  }}
                  onClick={handleClick}
                >
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="how-it-works__list">
              <div className="how-it-works__item">
                <div className="how-it-works__icon">
                  <DisplayIcon />
                </div>
                <div className="how-it-works__label">Удобный заказ на сайте</div>
              </div>
              <div className="how-it-works__item">
                <div className="how-it-works__icon">
                  <OfficeIcon />
                </div>
                <div className="how-it-works__label">Нет необходимости ехать в офис</div>
              </div>
              <div className="how-it-works__item">
                <div className="how-it-works__icon">
                  <GlobesIcon />
                </div>
                <div className="how-it-works__label">Огромный выбор направлений</div>
              </div>
            </div>
          </div>
        </section>
        <section className="feedback" id="/#feedbacks" ref={feedbackRef}>
          <div className="wrapper">
            <div className="feedback__title">ОТЗЫВЫ</div>
            <Slider />
          </div>
        </section>
        <Footer contactsRef={contactsRef}/>
      </main>
    </div>
  );
};

export default Index;
