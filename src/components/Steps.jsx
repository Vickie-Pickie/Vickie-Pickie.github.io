import React from 'react';
import { useSelector } from 'react-redux';
import './Steps.css';

const Steps = () => {
  const step = useSelector((state) => state.app.step);
  const stepArr = [
    {
      name: 'tickets',
      label: 'Билеты',
    },
    {
      name: 'passengers',
      label: 'Пассажиры',
    },
    {
      name: 'payment',
      label: 'Оплата',
    },
    {
      name: 'confirmation',
      label: 'Проверка',
    },
  ];

  const stepIndex = stepArr.findIndex((item) => item.name === step);
  let stepClass = 'steps';

  if (stepIndex === stepArr.length - 1) {
    stepClass += ' steps_full';
  }

  return (
    <div className={stepClass}>
      <div className="wrapper">
        <div className="steps__body">
          {
            stepArr.map((item, ind) => {
              let stepClass = 'steps__item';
              if (ind <= stepIndex) {
                stepClass += ' steps__item_active';
              }
              return (
                <div key={item.name} className={stepClass}>
                  <div className="steps__number">{ind + 1}</div>
                  <div className="steps__title">{item.label}</div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Steps;
