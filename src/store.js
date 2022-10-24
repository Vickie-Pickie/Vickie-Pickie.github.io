import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cityApi } from './api/city';
import { routesApi } from './api/routes';
import { subscriptionApi } from './api/subscribe';
import search from './slices/search';
import seats from './slices/seats';
import order from './slices/order';
import app from './slices/app';
import { orderApi } from './api/order';

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [cityApi.reducerPath]: cityApi.reducer,
    [routesApi.reducerPath]: routesApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    search: search.reducer,
    seats: seats.reducer,
    order: order.reducer,
    app: app.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([cityApi.middleware, routesApi.middleware, subscriptionApi.middleware, orderApi.middleware]),
});

setupListeners(store.dispatch);

export default store;
