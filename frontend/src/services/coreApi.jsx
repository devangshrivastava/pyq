import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const coreApi = createApi({
  reducerPath: 'coreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/core/' }),
  endpoints: (builder) => ({  
    allCourses: builder.query({
        query: () => {
            return {
            url: 'courses/',
            method: 'GET',
            // body: user, 
            headers: {
                'Content-type': 'application/json',
            }
            }
        }
      }),

    courses: builder.query({
      query: (course_id) => {
        // console.log(course_id);
          return {
          url: `courses/${course_id}`,
          method: 'GET',
          // body : course_id_array,
          headers: {
              'Content-type': 'application/json',
          }
          }
      }
    }),

    files: builder.query({
      query: (obj) => {
        // console.log(obj);
        const {id,type} = obj;
        // console.log(id,type);
          return {
          url:  `courses/${id}/${type}/`,
          method: 'GET',
          headers: {
              'Content-type': 'application/json',
            }
          }
      }
    }),
    
  }),
})


export const { useAllCoursesQuery, useFilesQuery, useCoursesQuery } = coreApi