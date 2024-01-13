import React from 'react'
import './Card.css'
import {Link} from 'react-router-dom'



export default function CardCourse({course}) {
  console.log(course);



  return (
    <div className="ag-courses_item">
        <Link 
          to = {`/courses/${course.course_id}/`}
          className="ag-courses-item_link"
        >

        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          {course.course_id}  
        </div>
        </Link>
    </div>
  )
}
