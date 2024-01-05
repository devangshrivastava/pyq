import React from 'react'
import './Card.css'
import {Link} from 'react-router-dom'

export default function CardItem({course}) {
  return (
    <div className="ag-courses_item">
        <Link 
          to = {`/courses/${course.course_id}/`}
          className="ag-courses-item_link"
        >
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          {/* &amp;&#160;  */}
          {course.course_id}
          
        </div>

        <div className="ag-courses-item_date-box">
          Start:
          <span className="ag-courses-item_date">
            04.11.2022
 
          </span>
        </div>
        </Link>
    </div>
  )
}
