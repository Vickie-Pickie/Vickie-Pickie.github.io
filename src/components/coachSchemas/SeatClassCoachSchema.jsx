import React from 'react';
import './SeatClassCoachSchema.css';
import useCoachSchema from '../../hooks/useCoachSchema';
import SeatItem from './SeatItem';

const sections = Array.from({ length: 8 });
const sectionsBottom = Array.from({ length: 6 });

const SeatClassCoachSchema = ({
  availableSeats,
  routeId,
  coachId,
}) => {
  const { isSeatAvailable, isSeatSelected, onSeatSelect } = useCoachSchema({ availableSeats, routeId, coachId });

  const seatItemProps = {
    className: 'schema__seat-section-item',
    isAvailable: isSeatAvailable,
    isSelected: isSeatSelected,
    onSeatSelect,
  };

  return (
    <div className="schema__seat">
      <div className="schema__seat-top">
        {
          sections.map((_, i) => {
            const startPos = i * 4;

            return (
              <div key={i} className="schema__seat-section">
                <div className="schema__seat-section-col">
                  <SeatItem
                    number={startPos + 1}
                    {...seatItemProps}
                  />
                  <SeatItem
                    number={startPos + 2}
                    {...seatItemProps}
                  />
                </div>
                <div className="schema__seat-section-col">
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
            );
          })
        }
      </div>
      <div className="schema__seat-bottom">
        <div className="schema__seat-section">
          <div className="schema__seat-section-col">
            <SeatItem
              number={33}
              {...seatItemProps}
            />
          </div>
          <div className="schema__seat-section-col">
            <SeatItem
              number={34}
              {...seatItemProps}
            />
            <SeatItem
              number={35}
              {...seatItemProps}
            />
          </div>
        </div>
        {
          sectionsBottom.map((_, i) => {
            const startPos = 35 + i * 4;
            return (
              <div key={i} className="schema__seat-section">
                <div className="schema__seat-section-col">
                  <SeatItem
                    number={startPos + 1}
                    {...seatItemProps}
                  />
                  <SeatItem
                    number={startPos + 2}
                    {...seatItemProps}
                  />
                </div>
                <div className="schema__seat-section-col">
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
            );
          })
        }
        <div className="schema__seat-section">
          <div className="schema__seat-section-col">
            <SeatItem
              number={60}
              {...seatItemProps}
            />
            <SeatItem
              number={61}
              {...seatItemProps}
            />
          </div>
          <div className="schema__seat-section-col">
            <SeatItem
              number={62}
              {...seatItemProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatClassCoachSchema;
