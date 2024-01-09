import { CssBaseline } from "@mui/material";
import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Reg from './user_pages/Auth';
import ResetPassword from './user_pages/ResetPassword';
import ResetPasswordConfirm from './user_pages/ResetPasswordConfirm';
import Dashboard from "./core_pages/Dashboard";
import SendPasswordResetEmail from "./user_pages/SendPasswordResetEmail";
import ChangePassword from "./user_pages/ChangePassword";
import Home from "./core_pages/Home";
import { useSelector } from "react-redux";
import Layout from "./core_pages/Layout";
import AllCourses from "./core_pages/AllCourses";
import Type from "./core_pages/Type";
import TypeFile from "./core_pages/TypeFile";

function App() {
  const { access_token } = useSelector((state) => state.auth);

  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <CssBaseline />
          <Routes>  
          <Route path="/auth" element={access_token ? <Navigate to="/home" /> : <Reg />} />

            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} /> 
            <Route path="/sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="/change-password" element={<ChangePassword />} />
            
            <Route path="/" element={<Layout />}>
            {/* <Route path="/" element={access_token ? <Layout /> : <Navigate to="/auth" />}> */}
                
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={ <Dashboard />} />
              <Route path="/courses" element={<AllCourses />} />
              <Route path = "/courses/:id" exact element = {<Type/>}/>
              <Route path = "/courses/:id/:type" exact element = {<TypeFile/>}/>
            </Route>
          
          
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
}

export default App;
