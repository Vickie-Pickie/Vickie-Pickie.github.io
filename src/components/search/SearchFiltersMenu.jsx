import React, { useState } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import StarIcon from '@mui/icons-material/Star';
import WifiIcon from '@mui/icons-material/Wifi';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import search from '../../slices/search';
import './SearchFiltersMenu.css';
import SecondClassSleeperIcon from '../icons/SecondClassSleeperIcon';
import ThirdClassSleeperIcon from '../icons/ThirdClassSleeperIcon';
import SeatIcon from '../icons/SeatIcon';
import SearchFiltersTimePicker from './SearchFiltersTimePicker';
import UISlider from '../ui/UISlider';

const SearchFiltersMenu = () => {
  const request = useSelector((state) => state.search.searchRequest);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceValue, setPriceValue] = useState([
    request.price_from || 0, request.price_to || 10000,
  ]);

  const handleSwitch = (field, e) => {
    const value = e.target.checked || null;

    dispatch(search.actions.setSearchRequest({
      [field]: value,
    }));

    let params = Object.fromEntries(searchParams.entries());
    if (!value) {
      delete params[field];
    } else {
      params = { ...params, [field]: value };
    }

    setSearchParams(params);
  };

  const handlePriceChange = (e, newValue) => {
    setPriceValue(newValue);
  };

  const handleCommittedPriceChange = (e, newValue) => {
    dispatch(search.actions.setSearchRequest({
      price_from: newValue[0],
      price_to: newValue[1],
    }));

    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({
      ...params,
      price_from: newValue[0],
      price_to: newValue[1],
    });
  };

  return (
    <section className="search-filters">
      <div className="search-filters__section">
        <div className="search-filters__options">
          <div className="search-filters__row">
            <div className="search-filters__option">
              <div className="search-filters__option-icon">
                <SecondClassSleeperIcon />
              </div>
              <div className="search-filters__option-label">Купе</div>
            </div>
            <div className="search-filters__option-switch">
              <Switch
                checked={request.have_second_class}
                onChange={(e) => handleSwitch('have_second_class', e)}
              />
            </div>
          </div>
          <div className="search-filters__row">
            <div className="search-filters__option">
              <div className="search-filters__option-icon">
                <ThirdClassSleeperIcon />
              </div>
              <div className="search-filters__option-label">Плацкарт</div>
            </div>
            <div className="search-filters__option-switch">
              <Switch
                checked={request.have_third_class}
                onChange={(e) => handleSwitch('have_third_class', e)}
              />
            </div>
          </div>
          <div className="search-filters__row">
            <div className="search-filters__option">
              <div className="search-filters__option-icon">
                <SeatIcon />
              </div>
              <div className="search-filters__option-label">Сидячий</div>
            </div>
            <div className="search-filters__option-switch">
              <Switch
                checked={request.have_fourth_class}
                onChange={(e) => handleSwitch('have_fourth_class', e)}
              />
            </div>
          </div>
          <div className="search-filters__row">
            <div className="search-filters__option">
              <div className="search-filters__option-icon">
                <StarIcon />
              </div>
              <div className="search-filters__option-label">Люкс</div>
            </div>
            <div className="search-filters__option-switch">
              <Switch
                checked={request.have_first_class}
                onChange={(e) => handleSwitch('have_first_class', e)}
              />
            </div>
          </div>
          <div className="search-filters__row">
            <div className="search-filters__option">
              <div className="search-filters__option-icon">
                <WifiIcon />
              </div>
              <div className="search-filters__option-label">Wi-Fi</div>
            </div>
            <div className="search-filters__option-switch">
              <Switch
                checked={request.have_wifi}
                onChange={(e) => handleSwitch('have_wifi', e)}
              />
            </div>
          </div>
          <div className="search-filters__row">
            <div className="search-filters__option">
              <div className="search-filters__option-icon">
                <RocketLaunchIcon />
              </div>
              <div className="search-filters__option-label">Эспресс</div>
            </div>
            <div className="search-filters__option-switch">
              <Switch
                checked={request.have_express}
                onChange={(e) => handleSwitch('have_express', e)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="search-filters__section">
        <div className="search-filters__price">
          <div className="search-filters__price-title">Стоимость</div>
          <div className="search-filters__price-slider">
            <UISlider
              aria-label="Custom marks"
              value={priceValue}
              step={10}
              valueLabelDisplay="on"
              marks={[{ value: 0 }, { value: 10000 }]}
              min={0}
              max={10000}
              onChange={handlePriceChange}
              onChangeCommitted={handleCommittedPriceChange}
              disableSwap
            />
          </div>
        </div>
      </div>
      <div className="search-filters__section">
        <SearchFiltersTimePicker direction="departure" title="Туда" />
      </div>
      <div className="search-filters__section">
        <SearchFiltersTimePicker direction="arrival" title="Обратно" />
      </div>
    </section>
  );
};

export default SearchFiltersMenu;
