import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import CardType from '../components/CardType';
import Switch from '@mui/material/Switch';

export default function Type({course}) {
    const { id } = useParams();
    console.log(id);
    
    const [selected, setSelected] = useState(false);
    const handleSwitchChange = () => {
      setSelected(!selected);
    };



    
    console.log(selected);
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
                  />
                </div>
            </div>
        </div>
    </div>
  )
}
