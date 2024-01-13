import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken, storeCourses } from '../services/LocalStorageService';
import { useEffect, useState } from 'react';
import { useGetLoggedUserQuery, useChoicesQuery} from '../services/userAuthApi';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import  ChangePassword  from '../user_pages/ChangePassword';


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
  console.log(data);
  
  // console.log(choices.data);


  const [userData, setUserData] = useState({
    email: "",
    name: ""
  })

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      storeCourses(data.courses)
      setUserData({
        email: data.email,
        name: data.name,
        courses: data.courses,
      })
    }
  }, [data, isSuccess])

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.email,
        name: data.name,
        courses: data.courses,
      }))
    }
  }, [data, isSuccess, dispatch])

  return (
    <div>
      <div className='mb-5'>
        <CssBaseline />
        <Grid container>
          <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
            <h1>Dashboard</h1>
            <Typography variant='h5'>Email: {userData.email}</Typography>
            <Typography variant='h6'>Name: {userData.name}</Typography>
            <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
          </Grid>
          <Grid item sm={8}>
          </Grid>
        </Grid>
      </div>
      <ChangePassword />
        

    </div>
  )
}
