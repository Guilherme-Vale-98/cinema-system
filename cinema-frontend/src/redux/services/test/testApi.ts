import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../../../types/UserType';
import { apiBaseUrl } from '../../../config/api';

const getToken = (): string => {
    const userFromStorage = JSON.parse(localStorage.getItem('user')!) as User;
    return userFromStorage.accessToken;
  };
  
export const testApi = createApi({
    reducerPath: 'testApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `${apiBaseUrl}/api`,
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
