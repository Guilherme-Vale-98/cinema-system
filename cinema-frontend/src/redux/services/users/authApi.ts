import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../../../types/UserType';
import { RootState } from '../../store';


export interface Credentials {
    username: string;
    password: string;
  }
  

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `http://localhost:8080/auth`,
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).userState.user?.accessToken;
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      login: builder.mutation< User, Credentials>({
        query(credentials:Credentials) {
          return {
            url: '/login',
            method: 'POST',
            body: credentials,
          };
        },
      }),
      checkRoles: builder.query({
        query: () => '/userRole',
      }),
      register: builder.mutation({
        query: (userData) => ({
          url: '/signup',
          method: 'POST',
          body: userData,
        }),
      }),
    }),
  });


  export const { useLoginMutation, useRegisterMutation, useLazyCheckRolesQuery } = authApi;