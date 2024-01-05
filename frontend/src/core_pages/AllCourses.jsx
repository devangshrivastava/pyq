import React,{useState,useEffect} from 'react'
import CardItem from '../components/CardItem'
import { useAllCoursesQuery } from '../services/coreApi'
;

export default function AllCourses() {
    // const [courses, setCourses] = useState([])

    
    
    const courses = useAllCoursesQuery();
    console.log(courses);
    if(courses.isLoading) return <div>Loading...</div>
    if(courses.isError) return <div>Error</div>
    // useEffect(() => {
    //   console.log("hi");
    //   console.log(isLoading);

    //   if (data && isSuccess) {
    //     setCourses(data);
    //   } else if (isLoading) {
    //     console.log("Loading...");
    //   } else {
    //     console.log("Error");
    //   }
    // }, [data, isSuccess, isLoading]);
    
  return (
    <div>
      {/* <div className=''> */}

    
        <div className='items-center top-0 mb-5'>
            <div className='w-5/6 mx-auto mt-8' > {/* Use mx-auto to horizontally center */}
                <div className='grid sm:grid-cols-2 md:grid-cols-3'>
                {courses.data.map((cou, index) => (
                    cou ? (
                    <CardItem key={index} course={cou} />
                            ) : null
                        ))}
                </div>
            </div>
        </div>
    </div>
  )
}
