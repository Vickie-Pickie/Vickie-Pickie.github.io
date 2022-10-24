import React from 'react';

const SeatItem = ({
  number,
  className,
  isAvailable,
  isSelected,
  onSeatSelect,
}) => {
  const handleSeatSelect = () => {
    if (!isAvailable(number)) {
      return;
    }

    onSeatSelect(number);
  };

  let seatClass = `seat-item ${className}`;
  if (isAvailable(number)) {
    seatClass += ' schema_item_available';
  }

  if (isSelected(number)) {
    seatClass += ' schema_item-selected';
  }

  return (
    <div className={seatClass} onClick={handleSeatSelect}>{ number }</div>
  );
};

export default SeatItem;
