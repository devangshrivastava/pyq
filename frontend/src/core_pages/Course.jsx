import React from 'react'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import CardType from '../components/CardType';

export default function Course({course}) {
    const { id } = useParams();
    
  return (
    <div>
       <div className="ag-courses_item">
        <div className='items-center top-0 mb-5'>
                <div className='w-5/6 mx-auto mt-8' > {/* Use mx-auto to horizontally center */}
                    <div className='grid sm:grid-cols-2 md:grid-cols-3'>
                        <CardType  type="Tutorials" course_id={id} />
                        <CardType  type="Quiz" course_id={id} />
                        <CardType  type="Study Material" course_id={id} />
                        <CardType  type="Majors/Minors" course_id={id} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
