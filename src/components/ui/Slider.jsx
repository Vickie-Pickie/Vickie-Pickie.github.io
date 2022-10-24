import React, { useState } from 'react';
import './Slider.css';

const feedbackList = [
  {
    author_name: 'Екатерина Вальнова',
    author_img: '/images/user_1.jpg',
    feedback_content: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля\n'
      + ' и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.',
  },
  {
    author_name: 'Евгений Стрыкало',
    author_img: '/images/user_2.jpg',
    feedback_content: 'СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов\n'
      + ' и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.',
  },
  {
    author_name: 'Петр Иванов',
    author_img: '/images/user_2.jpg',
    feedback_content: 'СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов\n',
  },
  {
    author_name: 'Мария Смирнова',
    author_img: '/images/user_1.jpg',
    feedback_content: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля\n'
      + ' и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.',
  },
  {
    author_name: 'Ирина Мягкова',
    author_img: '/images/user_1.jpg',
    feedback_content: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля\n'
      + ' и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.',
  },
];

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  const startPos = (slideIndex - 1) * 2;
  const displayedFeedbacks = feedbackList.slice(startPos, startPos + 2);
  const dotsQuantity = Math.ceil(feedbackList.length / 2);

  const movePage = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className="feedback__container">
      <div className="feedback__list">
        {
          displayedFeedbacks.map((item) => (
            <div
              key={item.author_name}
              className="feedback__item"
            >
              <div className="feedback__img">
                <img src={item.author_img} alt={item.author_name}/>
              </div>
              <div className="feedback__content">
                <div className="feedback__author">{item.author_name}</div>
                <div className="feedback__text">{item.feedback_content}</div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="feedback__dots">
        {
          Array.from({ length: dotsQuantity }).map((item, ind) => (
            <div
              key={ind}
              className={slideIndex === ind + 1 ? 'feedback__dot feedback__dot_active' : 'feedback__dot'}
              onClick={() => movePage(ind + 1)}
            >
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Slider;
