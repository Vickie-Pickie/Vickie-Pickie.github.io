import { createSlice } from '@reduxjs/toolkit';

const mapSeatFunc = (item) => {
  return {
    coach_id: item.coachId,
    person_info: {
      is_adult: true,
      first_name: '',
      last_name: '',
      patronymic: '',
      gender: true,
      birthday: '',
      document_type: 'passport',
      document_data: '',
    },
    seat_number: item.seatNumber,
    is_child: false,
    include_children_seat: false,
  };
};

const order = createSlice({
  name: 'order',
  initialState: {
    user: {
      first_name: '',
      last_name: '',
      patronymic: '',
      phone: '',
      email: '',
      payment_method: '',
    },
    departure: {
      route_direction_id: '',
      seats: [],
    },
    arrival: {
      route_direction_id: '',
      seats: [],
    },
    total: 0,
  },
  reducers: {
    initOrder(state, action) {
      const { departureId, arrivalId = null, seats } = action.payload;

      state.departure.route_direction_id = departureId;
      state.arrival.route_direction_id = arrivalId;
      state.departure.seats = seats
        .filter((item) => item.routeId === departureId)
        .map(mapSeatFunc);

      if (arrivalId) {
        state.arrival.seats = seats
          .filter((item) => item.routeId === arrivalId)
          .map(mapSeatFunc);
      }
    },
    savePassengerData(state, action) {
      const { seat, routeId, data } = action.payload;
      const routeType = state.departure.route_direction_id === routeId
        ? 'departure'
        : 'arrival';

      state[routeType].seats = state[routeType].seats.map((item) => {
        if (item.seat_number !== seat.seat_number || item.coach_id !== seat.coach_id) {
          return item;
        }

        let documentData;
        if (data.document_type === 'passport') {
          documentData = `${data.document_series} ${data.document_number}`;
        } else {
          documentData = data.document_number;
        }

        return {
          ...item,
          person_info: {
            is_adult: data.person === 'adult',
            first_name: data.first_name,
            last_name: data.last_name,
            patronymic: data.patronymic,
            gender: data.gender === 'male',
            birthday: data.date_of_birth,
            document_type: data.document_type,
            document_data: documentData,
          },
          is_child: data.person === 'children',
        };
      });
    },
    savePayerData(state, action) {
      const { data } = action.payload;
      state.user = {
        first_name: data.first_name,
        last_name: data.last_name,
        patronymic: data.patronymic,
        phone: data.phone,
        email: data.email,
        payment_method: data.payment_method,
      };
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
  },
});

export default order;
