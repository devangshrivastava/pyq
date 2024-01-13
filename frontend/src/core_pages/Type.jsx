import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import CardType from '../components/CardType';
import Switch from '@mui/material/Switch';
import { useUpdateCourseMutation } from '../services/userAuthApi';
import { getToken, getCourses, storeCourses } from '../services/LocalStorageService'

export default function Type({course}) {
    const { id } = useParams();

    const courses = getCourses()

    let isChosen = false

    if (courses.includes(id)) {
      console.log("if");
      isChosen = true
    }

    const [selected, setSelected] = useState(isChosen);
    const handleSwitchChange = () => {
      setSelected(!selected);
    };

    const [updateCourse] = useUpdateCourseMutation()
    const { access_token } = getToken()
    const handleSubmit = async (event) =>{
      
      if (!selected) {
        courses.push(id);
        const actualData = {"courses":courses};
        await updateCourse({actualData: actualData, access_token });
        storeCourses(courses);
      } 
      else {
        const actualData = {"courses":courses.filter(item => item !== id)};
        await updateCourse({actualData: actualData, access_token });
        storeCourses(courses.filter(item => item !== id));
        console.log("hi");
      }

    };


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
                <div>
                  {/* here */}
                  <Switch
                    checked={selected}
                    onChange={handleSwitchChange}
                    inputProps={{ 'aria-label': 'Switch' }}
                    onClick={handleSubmit}
                  />
                </div>
            </div>
        </div>
    </div>
  )
}
