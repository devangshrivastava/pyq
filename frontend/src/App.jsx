import { CssBaseline } from "@mui/material";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import Reg from './user_pages/Auth';
import Login from './user_pages/Login';
import ResetPassword from './user_pages/ResetPassword';
import ResetPasswordConfirm from './user_pages/ResetPasswordConfirm';
import SignUp from './user_pages/SignUp';
import Dashboard from "./core_pages/Dashboard";
import SendPasswordResetEmail from "./user_pages/SendPasswordResetEmail";
import ChangePassword from "./user_pages/ChangePassword";



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <CssBaseline />
          <Navbar/>
          <Routes>  
            <Route path = "/login" exact element = {<Login/>}/>
            <Route path = "/reset-password" exact element = {<ResetPassword/>}/>
            <Route path = "/password/reset/confirm/:uid/:token" exact element = {<ResetPasswordConfirm/>}/>
            <Route path = "/signup" exact element = {<SignUp/>}/>
            <Route path = "/auth" exact element = {<Reg/>}/>
            <Route path = "/dashboard" exact element = {<Dashboard/>}/>
            <Route path = "/sendpasswordresetemail" exact element = {<SendPasswordResetEmail/>}/>
            <Route path = "/change-password" exact element = {<ChangePassword/>}/>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </>
  )
}

export default App
