import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const subscriptionApi = createApi({
  reducerPath: 'subscriptionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://netology-trainbooking.netoservices.ru' }),
  endpoints: (builder) => ({
    addSubscription: builder.mutation({
      query: (data) => ({ url: 'subscribe', method: 'POST', body: data }),
    }),
  }),
});

export const {
  useAddSubscriptionMutation,
} = subscriptionApi;
