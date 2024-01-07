// import React from 'react'
// import { useChoicesQuery} from '../services/userAuthApi';
// import { getToken } from '../services/LocalStorageService';
// import CardCourse from '../components/CardCourse';


// export default function Home(){
//   const { access_token } = getToken()
//   // console.log(access_token);
//   const choices = useChoicesQuery(access_token);
//   // console.log(choices.data);
//   console.log(choices.data);
  

//   if(choices.isLoading) return <div>Loading...</div>
//   if(choices.isError) return <div>Error</div>
//   return (
//     <div>
//       <div className='items-center top-0 mb-5'>
//             <div className='w-5/6 mx-auto mt-8' >
//                 <div className='grid sm:grid-cols-2 md:grid-cols-3'>
//                 {choices.data.map((choice, index) => (
//                     choice ? (
//                     <CardCourse key={index} course={ choice }/>
//                             ) : null
//                         ))}
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }


import { Button, CssBaseline, Grid, Typography } from '@mui/material';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from '../services/LocalStorageService';
import { useEffect, useState } from 'react';
import { useGetLoggedUserQuery, useChoicesQuery} from '../services/userAuthApi';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
// import { ChangePassword } from '../user_pages/ChangePassword';


export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }))
    dispatch(unSetUserToken({ access_token: null }))
    removeToken()
    navigate('/auth')
  }
  
  const dispatch = useDispatch()
  const { access_token } = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(access_token)

  const choices = useChoicesQuery(access_token)
  console.log(choices.data);

  

  const [userData, setUserData] = useState({
    email: "",
    name: ""
  })

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        name: data.name,
      })
    }
  }, [data, isSuccess])

  // // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.email,
        name: data.name
      }))
    }
  }, [data, isSuccess, dispatch])
  return (
    <div>
      <CssBaseline />
        <Grid container>
          <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
            <h1>Dashboard</h1>
            <Typography variant='h5'>Email: {userData.email}</Typography>
            <Typography variant='h6'>Name: {userData.name}</Typography>
            <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
          </Grid>
          <Grid item sm={8}>
            {/* <ChangePassword /> */}
          </Grid>
        </Grid>
        

    </div>
  )
}
