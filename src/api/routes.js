import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const routesApi = createApi({
  reducerPath: 'routesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://netology-trainbooking.netoservices.ru' }),
  endpoints: (builder) => ({
    getListRoutes: builder.query({
      query: (searchRequest) => {
        const correctRequest = Object.keys(searchRequest).reduce((req, key) => {
          if (searchRequest[key]) {
            req[key] = searchRequest[key];
          }

          return req;
        }, {});

        const searchParams = new URLSearchParams(correctRequest);

        return {
          url: `/routes?${searchParams.toString()}`,
          method: 'GET',
        }
      },
    }),
    getSeats: builder.query({
      query: (id) => {
        return {
          url: `/routes/${id}/seats`,
          method: 'GET',
        }
      },
    }),
    getLastTickets: builder.query({
      query: () => {
       return {
         url: '/routes/last',
         method: 'GET',
       }
      },
    }),
  }),
});

export const {
  useLazyGetListRoutesQuery,
  useLazyGetSeatsQuery,
  useLazyGetLastTicketsQuery,
} = routesApi;
