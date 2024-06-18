import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cinemaApi = createApi({
  reducerPath: 'cinemaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (builder) => ({
    getSessionsByDate: builder.query({
      query: (date) => `/sessions/date/${date}`,
    }),
  }),
});

export const { useGetSessionsByDateQuery } = cinemaApi;