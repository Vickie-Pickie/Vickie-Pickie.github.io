import React from 'react';
import './ThirdClassCoachSchema.css';
import useCoachSchema from '../../hooks/useCoachSchema';
import SeatItem from './SeatItem';

const sections = Array.from({ length: 8 });

const ThirdClassCoachSchema = ({
  availableSeats,
  routeId,
  coachId,
}) => {
  const { isSeatAvailable, isSeatSelected, onSeatSelect } = useCoachSchema({ availableSeats, routeId, coachId });

  const seatItemProps = {
    className: 'schema__3class-top-item',
    isAvailable: isSeatAvailable,
    isSelected: isSeatSelected,
    onSeatSelect,
  };

  return (
    <div className="schema__3class">
      {
        sections.map((_, i) => {
          const startTop = i * 4;
          const startBottom = 32 + i * 2;
          return (
            <div key={i} className="schema__3class-section">
              <div className="schema__3class-top">
                <div className="schema__3class-top-col">
                  <SeatItem
                    number={startTop + 1}
                    {...seatItemProps}
                  />
                  <SeatItem
                    number={startTop + 2}
                    {...seatItemProps}
                  />
                </div>
                <div className="schema__3class-top-col">
                  <SeatItem
                    number={startTop + 3}
                    {...seatItemProps}
                  />
                  <SeatItem
                    number={startTop + 4}
                    {...seatItemProps}
                  />
                </div>
              </div>
              <div className="schema__3class-bottom">
                <SeatItem
                  number={startBottom + 1}
                  {...seatItemProps}
                  className="schema__3class-bottom-item"
                />
                <SeatItem
                  number={startBottom + 2}
                  {...seatItemProps}
                  className="schema__3class-bottom-item"
                />
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default ThirdClassCoachSchema;
