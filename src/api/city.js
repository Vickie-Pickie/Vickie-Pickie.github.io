import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const cityApi = createApi({
  reducerPath: 'cityApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://netology-trainbooking.netoservices.ru' }),
  endpoints: (builder) => ({
    getListCities: builder.query({
      query: (name) => ({ url: `/routes/cities?name=${name}`, method: 'GET' }),
    }),
  }),
});

export const {
  useLazyGetListCitiesQuery,
} = cityApi;
