import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export interface Credentials {
    username: string;
    password: string;
  }
  
export interface UserData {
    username: string;
    password: string;
    email: string;
    roel?: string[]
  }
  

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `http://localhost:8080/auth`,
    }),
    endpoints: (builder) => ({
      login: builder.mutation({
        query(credentials:Credentials) {
          return {
            url: '/login',
            method: 'POST',
            body: credentials,
          };
        },
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


  export const { useLoginMutation, useRegisterMutation } = authApi;