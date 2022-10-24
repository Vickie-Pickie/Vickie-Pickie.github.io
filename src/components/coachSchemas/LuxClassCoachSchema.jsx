import React from 'react';
import './LuxClassCoachSchema.css';
import useCoachSchema from '../../hooks/useCoachSchema';
import SeatItem from './SeatItem';

const sections = Array.from({ length: 8 });

const LuxClassCoachSchema = ({
  availableSeats,
  routeId,
  coachId,
}) => {
  const { isSeatAvailable, isSeatSelected, onSeatSelect } = useCoachSchema({ availableSeats, routeId, coachId });

  const seatItemProps = {
    className: 'schema__lux-top-item',
    isAvailable: isSeatAvailable,
    isSelected: isSeatSelected,
    onSeatSelect,
  };

  return (
    <div className="schema__lux">
      {
        sections.map((_, i) => {
          const startPos = i * 2;
          return (
            <div key={i} className="schema__lux-section">
              <div className="schema__lux-top">
                <SeatItem
                  number={startPos + 1}
                  {...seatItemProps}
                />
                <SeatItem
                  number={startPos + 2}
                  {...seatItemProps}
                />
              </div>
              <div className="schema__lux-bottom">
                <div className="schema__lux-bottom-item"></div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default LuxClassCoachSchema;
