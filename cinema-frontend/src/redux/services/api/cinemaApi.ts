import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie } from '../../../types/MovieType';
import { Ticket } from '../../../types/TicketType';

interface GetMovieSessionByDateRequest {
  movieTitle?: string;
  sessionId?: string;
}

export const cinemaApi = createApi({
  reducerPath: 'cinemaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints: (builder) => ({
    getMoviesByDate: builder.query<Movie[], string>({
      query: (date) => `/movies/session/${date}`,
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
      query: (userId) => `/sessions/tickets/user/${userId}` 
    })
  }),
});

export const { useGetMoviesByDateQuery, useGetMovieSessionByDateQuery, usePostTicketsMutation, useGetTicketsByUserIdQuery } = cinemaApi;