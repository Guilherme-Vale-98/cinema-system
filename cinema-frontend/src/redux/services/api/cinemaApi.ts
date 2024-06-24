import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from '../../../types/MovieType';

interface GetMovieSessionByDateRequest {
  movieTitle?: string;
  sessionId?: string;
}

export const cinemaApi = createApi({
  reducerPath: 'cinemaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (builder) => ({
    getMoviesByDate: builder.query<Movie, string>({
      query: (date) => `/movies/session/${date}`,
    }),
    getMovieSessionByDate: builder.query<Movie, GetMovieSessionByDateRequest>({
      query: ({movieTitle, sessionId}) => `/movies/${movieTitle}/${sessionId}`,
    }),

  }),
});

export const { useGetMoviesByDateQuery, useGetMovieSessionByDateQuery } = cinemaApi;