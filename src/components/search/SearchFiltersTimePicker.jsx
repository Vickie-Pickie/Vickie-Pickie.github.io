import React, { useState } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import './SearchFiltersTimePicker.css';
import { IconButton } from '@mui/material';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import search from '../../slices/search';
import { transformMinutesToHours } from '../../utils/date';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import UISlider from '../ui/UISlider';

const SearchFiltersTimePicker = ({
  direction,
  title,
}) => {
  const request = useSelector((state) => state.search.searchRequest);
  const dispatch = useDispatch();
  const [timeStart, setTimeStart] = useState([
    request[`start_${direction}_hour_from`] || 0, request[`start_${direction}_hour_to`] || 1439,
  ]);
  const [timeEnd, setTimeEnd] = useState([
    request[`end_${direction}_hour_from`] || 0, request[`end_${direction}hour_to`] || 1439,
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(true);

  const handleTimeStartChange = (e, newValue) => {
    setTimeStart(newValue);
  };

  const handleTimeEndChange = (e, newValue) => {
    setTimeEnd(newValue);
  };

  const handleCommittedTimeStartChange = (e, newValue) => {
    dispatch(search.actions.setSearchRequest({
      [`start_${direction}_hour_from`]: newValue[0],
      [`start_${direction}_hour_to`]: newValue[1],
    }));

    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...params,
      [`start_${direction}_hour_from`]: newValue[0],
      [`start_${direction}_hour_to`]: newValue[1],
    });
  };

  const handleCommittedTimeEndChange = (e, newValue) => {
    dispatch(search.actions.setSearchRequest({
      [`end_${direction}_hour_from`]: newValue[0],
      [`end_${direction}hour_to`]: newValue[1],
    }));

    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...params,
      [`end_${direction}_hour_from`]: newValue[0],
      [`end_${direction}hour_to`]: newValue[1],
    });
  };

  return (
    <div className="search-filters__time">
      <div className="search-filters__time-title">
        <div className="search-filters__time-direction">
          <div className="search-filters__time-arrow">
            {
              direction === 'departure' ? <ArrowRightIcon /> : <ArrowLeftIcon />
            }
          </div>
          <div className="search-filters__time-text">{title}</div>
        </div>
        <div className="search-filters__time-button">
          {
            isOpen ? (
              <IconButton>
                <IndeterminateCheckBoxOutlinedIcon onClick={() => setIsOpen(!isOpen)}/>
              </IconButton>
            )
              : (
                <IconButton>
                  <AddBoxOutlinedIcon onClick={() => setIsOpen(!isOpen)}/>
                </IconButton>
              )
          }
        </div>
      </div>
      {
        isOpen && (
          <>
            <div className="search-filters__time-row">
              <div className="search-filters__time-row-label">
                Время отбытия
              </div>
              <div className="search-filters__time-slider">
                <UISlider
                  aria-label="Custom marks"
                  value={timeStart}
                  step={60}
                  valueLabelFormat={transformMinutesToHours}
                  valueLabelDisplay="on"
                  marks={[{ value: 0 }, { value: 1439 }]}
                  min={0}
                  max={1439}
                  onChange={handleTimeStartChange}
                  onChangeCommitted={handleCommittedTimeStartChange}
                  disableSwap
                  sx={{
                    '& .MuiSlider-markLabel': {
                      color: '#E5E5E5',
                    },
                  }}
                />
              </div>
            </div>
            <div className="search-filters__time-row">
              <div className="search-filters__time-row-label search-filters__time-row-label_right">
                Время прибытия
              </div>
              <div className="search-filters__time-slider">
                <UISlider
                  aria-label="Custom marks"
                  value={timeEnd}
                  step={60}
                  valueLabelFormat={transformMinutesToHours}
                  valueLabelDisplay="on"
                  marks={[{ value: 0 }, { value: 1439 }]}
                  min={0}
                  max={1439}
                  onChange={handleTimeEndChange}
                  onChangeCommitted={handleCommittedTimeEndChange}
                  disableSwap
                />
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default SearchFiltersTimePicker;
