import React from 'react';
import './SecondClassCoachSchema.css';
import useCoachSchema from '../../hooks/useCoachSchema';
import SeatItem from './SeatItem';

const sections = Array.from({ length: 8 });

const SecondClassCoachSchema = ({
  availableSeats,
  routeId,
  coachId,
}) => {
  const { isSeatAvailable, isSeatSelected, onSeatSelect } = useCoachSchema({ availableSeats, routeId, coachId });

  const seatItemProps = {
    className: 'schema__2class-top-item',
    isAvailable: isSeatAvailable,
    isSelected: isSeatSelected,
    onSeatSelect,
  };

  return (
    <div className="schema__2class">
      {
        sections.map((_, i) => {
          const startPos = i * 4;
          return (
            <div key={i} className="schema__2class-section">
              <div className="schema__2class-top">
                <div className="schema__2class-top-col">
                  <SeatItem
                    number={startPos + 1}
                    {...seatItemProps}
                  />
                  <SeatItem
                    number={startPos + 2}
                    {...seatItemProps}
                  />
                </div>
                <div className="schema__2class-top-col">
                  <SeatItem
                    number={startPos + 3}
                    {...seatItemProps}
                  />
                  <SeatItem
                    number={startPos + 4}
                    {...seatItemProps}
                  />
                </div>
              </div>
              <div className="schema__2class-bottom">
                <div className="schema__2class-bottom-item"></div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default SecondClassCoachSchema;
