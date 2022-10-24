import { createSlice } from '@reduxjs/toolkit';

export const initialSearchRequest = () => ({
  from_city_name: '',
  to_city_name: '',
  from_city_id: '',
  to_city_id: '',
  date_start: null,
  date_end: null,
  date_start_arrival: null,
  date_end_arrival: null,
  have_first_class: null,
  have_second_class: null,
  have_third_class: null,
  have_fourth_class: null,
  have_wifi: null,
  have_air_conditioning: null,
  have_express: null,
  price_from: null,
  price_to: null,
  start_departure_hour_from: null,
  start_departure_hour_to: null,
  start_arrival_hour_from: null,
  start_arrival_hour_to: null,
  end_departure_hour_from: null,
  end_departure_hour_to: null,
  end_arrival_hour_from: null,
  end_arrival_hour_to: null,
  limit: 5,
  offset: 0,
  sort: 'price_min',
});

const search = createSlice({
  name: 'search',
  initialState: {
    searchRequest: initialSearchRequest(),
  },
  reducers: {
    setSearchRequest(state, action) {
      const availableFields = Object.keys(initialSearchRequest());
      const request = Object.keys(action.payload)
        .filter((field) => availableFields.includes(field))
        .reduce((res, field) => {
          res[field] = action.payload[field];
          return res;
        } , {});

      state.searchRequest = {...state.searchRequest, ...request};
    },
  },
});

export default search;
