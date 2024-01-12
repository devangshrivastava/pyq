import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import CardType from '../components/CardType';
import Switch from '@mui/material/Switch';
import { useUpdateCourseMutation } from '../services/userAuthApi';
import { getToken } from '../services/LocalStorageService'

export default function Type({course}) {
    const { id } = useParams();
    // console.log(id);
    
    const [selected, setSelected] = useState(false);
    const handleSwitchChange = () => {
      setSelected(!selected);
    };

    const [updateCourse] = useUpdateCourseMutation()
    const { access_token } = getToken()
    const actualData = {"courses":["Course1", "Course2", "Course3"]};
    const actualData2 = {"courses":["REMOVED"]};
    const handleSubmit = async (event) => {
      
      if (selected) {
        // Add the course to the actual data

        await updateCourse({actualData: actualData, access_token });
      } 
      
      else {
        // Remove the course from the actual data
        // const updatedData = actualData.filter((courseId) => courseId !== id);
        // Use your mutation function to update the course data on the server
        // console.log(actualData2);
        await updateCourse({actualData: actualData2, access_token });
        console.log("hi");
      }

    };



    
    // console.log(selected);
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
