// import './App.css';
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import Activate from './user_pages/Activate';
import FirstPage from './user_pages/FirstPage';
import Login from './user_pages/Login';
import ResetPassword from './user_pages/ResetPassword';
import ResetPasswordConfirm from './user_pages/ResetPasswordConfirm';
import SignUp from './user_pages/SignUp';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <Navbar/>
          <Routes>  
            <Route path="/activate/:uid/:token" exact element={<Activate />} />
            <Route path = "/" exact element = {<FirstPage/>}/>
            <Route path = "/login" exact element = {<Login/>}/>
            <Route path = "/reset-password" exact element = {<ResetPassword/>}/>
            <Route path = "/password/reset/confirm/:uid/:token" exact element = {<ResetPasswordConfirm/>}/>
            <Route path = "/signup" exact element = {<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </>
  )
}

export default App
