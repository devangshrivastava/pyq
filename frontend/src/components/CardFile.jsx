import React from 'react'
import './Card.css'
import {Link} from 'react-router-dom'

export default function CardFile(file) {
  console.log()
  return (
    <div>
        <div className="ag-courses_item">
            <Link 
            to = {`/courses/`}
            className="ag-courses-item_link"
            >
            <div className="ag-courses-item_bg"></div>

            <div className="ag-courses-item_title">
            {file.file.file_nme}
            </div>
            </Link>
        </div>
    </div>
  )
}
