import { CssBaseline } from "@mui/material";
import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Reg from './user_pages/Auth';
import Login from './user_pages/Login';
import ResetPassword from './user_pages/ResetPassword';
import ResetPasswordConfirm from './user_pages/ResetPasswordConfirm';
import SignUp from './user_pages/SignUp';
import Dashboard from "./core_pages/Dashboard";
import SendPasswordResetEmail from "./user_pages/SendPasswordResetEmail";
import ChangePassword from "./user_pages/ChangePassword";
import Home from "./core_pages/Home";
import { useSelector } from "react-redux";
import Layout from "./core_pages/Layout";


function App() {
  const { access_token } = useSelector((state) => state.auth);

  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <CssBaseline />
          <Routes>  
          <Route path="/auth" element={access_token ? <Navigate to="/dashboard" /> : <Reg />} />

            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} /> 
            <Route path="/sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="/change-password" element={<ChangePassword />} />
            
            <Route path="/" element={access_token ? <Layout /> : <Navigate to="/auth" />}>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={ <Dashboard />} />
            </Route>
          
          
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
}

export default App;
