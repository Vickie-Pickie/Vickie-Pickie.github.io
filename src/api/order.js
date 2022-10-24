import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://netology-trainbooking.netoservices.ru' }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({ url: 'order', method: 'POST', body: data }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
} = orderApi;
