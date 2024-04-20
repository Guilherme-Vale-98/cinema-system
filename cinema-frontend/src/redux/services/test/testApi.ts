import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../../features/users/authSlice';

const getToken = (): string => {
    const userFromStorage = JSON.parse(localStorage.getItem('user')!) as User;
    return userFromStorage.accessToken;
  };
  
export const testApi = createApi({
    reducerPath: 'testApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `http://localhost:8080/api`,
      prepareHeaders: (headers) => {
        const token = getToken();
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getTest: builder.query({
        query: (test) => `/${test}`       
      })
    }),
  });


  export const { useGetTestQuery} = testApi;