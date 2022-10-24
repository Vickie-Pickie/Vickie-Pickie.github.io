import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import './Footer.css';
import { Button } from '@mui/material';
import PhoneIcon from './icons/PhoneIcon';
import EmailIcon from './icons/EmailIcon';
import SkypeIcon from './icons/SkypeIcon';
import LocationIcon from './icons/LocationIcon';
import TextField from './ui/TextField';
import YoutubeIcon from './icons/YoutubeIcon';
import TwitterIcon from './icons/TwitterIcon';
import FacebookIcon from './icons/FacebookIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import GoogleIcon from './icons/GoogleIcon';
import ArrowUpIcon from './icons/ArrowUpIcon';
import { useAddSubscriptionMutation } from '../api/subscribe';

const Footer = ({ contactsRef }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [subscribe] = useAddSubscriptionMutation();

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const validationSchema = yup.object({
    email: yup.string().required('Введите e-mail').email('Введите корректный e-mail'),
  });

  const formik = useFormik(
    {
      initialValues: {
        email: '',
      },
      validationSchema,
      onSubmit: ({ email }, { resetForm }) => {
        subscribe({ email });
        resetForm();
      },
    },
  );

  return (
    <footer className="footer">
      <div className="wrapper">
        <div className="footer__container">
          <div id="/#contacts" ref={contactsRef}>
            <div className="footer__title">Свяжитесь с нами</div>
            <div className="contacts">
              <div className="contacts__item">
                <div className="contacts__item-icon">
                  <PhoneIcon />
                </div>
                <div className="contacts__item-value">8 (800) 000 00 00</div>
              </div>
              <div className="contacts__item">
                <div className="contacts__item-icon">
                  <EmailIcon />
                </div>
                <div className="contacts__item-value">inbox@mail.ru</div>
              </div>
              <div className="contacts__item">
                <div className="contacts__item-icon">
                  <SkypeIcon />
                </div>
                <div className="contacts__item-value">tu.train.tickets</div>
              </div>
              <div className="contacts__item">
                <div className="contacts__item-icon">
                  <LocationIcon />
                </div>
                <div className="contacts__item-value">г. Москва ул. Московская 27-35 555 555</div>
              </div>
            </div>
          </div>
          <div>
            <div className="footer__title">Подписка</div>
            <div className="subscription-form">
              <div className="subscription-form__label">Будьте в курсе событий</div>
              <form className="subscription-form__control" onSubmit={formik.handleSubmit}>
                <TextField
                  value={formik.values.email}
                  error={Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  id="field-subscribe"
                  variant="outlined"
                  size="small"
                  placeholder="email"
                  sx={{
                    width: '250px',
                    mr: '10px',
                  }}
                  onChange={(e) => formik.setFieldValue('email', e.target.value)}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  size="small"
                  sx={{
                    height: '40px',
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
                  Отправить
                </Button>
              </form>
            </div>
            <div className="footer__title">Подписывайтесь на нас</div>
            <div className="social-networks">
              <div className="social_networks__item youtube">
                <YoutubeIcon />
              </div>
              <div className="social_networks__item twitter">
                <TwitterIcon />
              </div>
              <div className="social_networks__item facebook">
                <FacebookIcon />
              </div>
              <div className="social_networks__item linkedIn">
                <LinkedinIcon />
              </div>
              <div className="social_networks__item google-plus">
                <GoogleIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="wrapper">
          <div className="bottom-container">
            <Link to="/" className="logo">
              Лого
            </Link>
            <div className="bottom__arrow" onClick={goToTop}>
              <ArrowUpIcon />
            </div>
            <div className="bottom__copyrights">2018 WEB</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
