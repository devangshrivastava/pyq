import React,{useState,useEffect} from 'react'
import CardCourse from '../components/CardCourse'
import { useAllCoursesQuery } from '../services/coreApi'
;

export default function AllCourses() {

    const courses = useAllCoursesQuery();
    console.log(courses);
    if(courses.isLoading) return <div>Loading...</div>
    if(courses.isError) return <div>Error</div>
  
  return (
    <div>
        <div className='items-center top-0 mb-5'>
            <div className='w-5/6 mx-auto mt-8' > {/* Use mx-auto to horizontally center */}
                <div className='grid sm:grid-cols-2 md:grid-cols-3'>
                {courses.data.map((course, index) => (
                    course ? (
                    <CardCourse key={index} course={ course }/>
                            ) : null
                        ))}
                </div>
            </div>
        </div>
    </div>
  )
}
