import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from '../../../types/MovieType';
import { Ticket } from '../../../types/TicketType';
import { RootState } from '../../store';

interface GetMovieSessionByDateRequest {
  movieTitle?: string;
  sessionId?: string;
}

export const cinemaApi = createApi({
  reducerPath: 'cinemaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.user?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMoviesByDate: builder.query<Movie[], string>({
      query: (date) => `/movies/session/${date}`,
    }),
    getFeaturedMovies: builder.query({
      query: () => "/movies/featured"
    }),
    getMovieSessionByDate: builder.query<Movie, GetMovieSessionByDateRequest>({
      query: ({movieTitle, sessionId}) => `/movies/${movieTitle}/${sessionId}`,
    }),
    postTickets: builder.mutation({
      query: ({sessionId, tickets})=>({
        url: `/sessions/${sessionId}/tickets`,
        method: 'POST',
        body: tickets
      })
    }),
    getTicketsByUserId: builder.query({
      query: () => `/sessions/tickets/user` 
    })
  }),
});

export const { useGetMoviesByDateQuery, useGetMovieSessionByDateQuery, usePostTicketsMutation, useGetTicketsByUserIdQuery, useGetFeaturedMoviesQuery} = cinemaApi;