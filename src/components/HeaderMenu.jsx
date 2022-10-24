import React from 'react';
import { Link } from 'react-router-dom';

const HeaderMenu = ({
  aboutRef,
  howItWorksRef,
  feedbackRef,
  contactsRef,
}) => {
  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="header-menu-block">
      <div className="wrapper">
        <div className="header__menu">
          <Link to="/#about" className="menu__item" onClick={() => handleScroll(aboutRef.current)}>О нас</Link>
          <Link to="/#how-it-works" className="menu__item" onClick={() => handleScroll(howItWorksRef.current)}>Как это работает</Link>
          <Link to="/#feedbacks" className="menu__item" onClick={() => handleScroll(feedbackRef.current)}>Отзывы</Link>
          <Link to="/#contacts" className="menu__item" onClick={() => handleScroll(contactsRef.current)}>Контакты</Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
