import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';


export default function Navbar() {
  const {access_token } = getToken()

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: '#001f3f' }}>
          <Toolbar>
            <Typography variant='h5' component="div" sx={{ flexGrow: 1 }}>PYQ</Typography>

            <Button component={NavLink} to='/home' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>
            {/* {access_token ? <Button component={NavLink} to='/dashboard' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Dashboard</Button> : <Button component={NavLink} to='/auth' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Login/Registration</Button>} */}
            <Button component={NavLink} to='/dashboard' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Dashboard</Button>
            <Button component={NavLink} to='/courses' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Courses</Button>
            
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
