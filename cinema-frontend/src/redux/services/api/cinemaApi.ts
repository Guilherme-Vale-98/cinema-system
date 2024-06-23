import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cinemaApi = createApi({
  reducerPath: 'cinemaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (builder) => ({
    getMoviesByDate: builder.query({
      query: (date) => `/movies/session/${date}`,
    }),
  }),
});

export const { useGetMoviesByDateQuery } = cinemaApi;