import React from 'react'
import './Card.css'
import {Link} from 'react-router-dom'

export default function CardType({type,course_id}){
  
//   console.log(course)
  return (
    <div className="ag-courses_item">
        <Link 
          to = {`/courses/${course_id}/${type}`}
          className="ag-courses-item_link"
        >
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          {type}  
        </div>
        </Link>
    </div>
  )
}
