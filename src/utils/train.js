export const coachType = (type) => {
  switch (type) {
    case 'first':
      return 'Люкс';
    case 'second':
      return 'Купе';
    case 'third':
      return 'Плацкарт';
    case 'fourth':
      return 'Сидячий';
    default:
      return 'Неизвестно';
  }
};

const findMinPrice = (prices) => Object.values(prices).reduce((min, price) => {
  if (min === null || min > price) {
    return price;
  }

  return min;
}, null);

export const minPriceForCoachType = (item, type) => {
  let minPrice = null;
  if (item.departure.price_info[type]) {
    minPrice = findMinPrice(item.departure.price_info[type]);
  }

  if (!item.arrival) {
    return minPrice;
  }

  if (item.arrival.price_info[type]) {
    const arrivalMinPrice = findMinPrice(item.arrival.price_info[type]);
    if (minPrice === null || minPrice > arrivalMinPrice) {
      minPrice = arrivalMinPrice;
    }
  }

  return minPrice;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

export const calcSeatPrice = (coach, seatNumber, isChild) => {
  const koeff = isChild ? 0.5 : 1;
  const isEven = seatNumber % 2 === 0;
  let basePrice;

  switch (coach.class_type) {
    case 'first':
      return coach.price * koeff;

    case 'second':
    case 'third':
      basePrice = isEven ? coach.top_price : coach.bottom_price;
      return basePrice * koeff;

    case 'fourth':
      return coach.bottom_price * koeff;
    default:
      return 0;
  }
};
