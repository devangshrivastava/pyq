
import { getToken, storeCourses, getCourses } from '../services/LocalStorageService';
import { useCoursesQuery} from '../services/coreApi';
import CardCourse from '../components/CardCourse'

export default function Home(){

  

  const course_ids = {courses: getCourses()}
  const display = []
  for (const course_id of course_ids.courses) {
    const courses = useCoursesQuery(course_id)
    display.push(courses.data)
  }
  console.log(display);
  return (
    <div>
      <div className='items-center top-0 mb-5'>
            <div className='w-5/6 mx-auto mt-8' >
                <div className='grid sm:grid-cols-2 md:grid-cols-3'>
                {display.map((course, index) => (
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