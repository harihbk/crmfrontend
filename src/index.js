import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login/Login';
import Forgotpassword from './pages/Forgotpassword/Forgotpassword';
import Otp from './pages/otp/Otp';
import Resetpassword from './pages/resetpassword/Resetpassword';
import Thankyou from './pages/Thankyou';
import Dashboard from './pages/innercomponents/Dashboard';
import Layouts from './pages/components/Layout';
import Lead from './pages/innercomponents/Lead';
import Role from './pages/role/role';
import User from './pages/user/user';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/otp/:_id" element={<Otp />} />
        <Route path="/resetpassword/:token/:_id" element={<Resetpassword />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/" element={<Layouts/>}>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/lead" element={<Lead/>}></Route>
          <Route path="/role" element={<Role/>}></Route>
          <Route path="/user" element={<User/>}></Route>


        </Route>


        
      </Routes>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
