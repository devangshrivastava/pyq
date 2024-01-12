import { useEffect, useState } from 'react';
import { useChoicesQuery} from '../services/userAuthApi';
import { getToken } from '../services/LocalStorageService';
import CardCourse from '../components/CardCourse';
import { useDispatch, useSelector } from 'react-redux';


export default function Home(){
  const { access_token } = getToken()
  // const choices = useChoicesQuery(access_token);
  // console.log(choices.data);
  const userInfo = useSelector((state) => state.user.courses);
  console.log(userInfo);

  


  

  // if(choices.isLoading) return <div>Loading...</div>
  // if(choices.isError) return <div>Error</div>
  return (
    <div>
      <div className='items-center top-0 mb-5'>
            <div className='w-5/6 mx-auto mt-8' >
                <div className='grid sm:grid-cols-2 md:grid-cols-3'>
                {/* {choices.data.map((choice, index) => (
                    choice ? (
                    <CardCourse key={index} course={ choice }/>
                            ) : null
                        ))} */}
                </div>
            </div>
        </div>
    </div>
  )
}