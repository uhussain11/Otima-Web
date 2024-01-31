import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from './LandingPage/home';
import Service from './Services/main';
import Career from './Career/main';
import Application from './Career/application';
import Meeting from './Schedule Meeting/main';
import Api from './API/main';
import About from './About/main';

import Navbar from './constants/navbar';
import Footer from './constants/footer';
import DashBoard from './DashBoard/dashboard'
import Signin from './SignIn Page/signin'

import { useCookies } from "react-cookie";
import React, {useState, useEffect} from 'react'
import { validSession } from './config';

function App() {
  const [cookies, setCookie] = useCookies(['terms']);
  const [sessionCookie, setSessionCookie] = useCookies(['SessionID']);

  const [loggedIn, setLoggedIn] = useState(null);

  function accept(){
    document.getElementById('cookies').style.animation = 'cookie-remove 600ms ease 0s 1 forwards';
    setTimeout(() => {
      setCookie('terms', true);
    }, 600);  }

    useEffect(() => {
      async function validateSession() {
        try {
            const isValid = await validSession();
            console.log(isValid)
            setLoggedIn(isValid);
            if(!isValid){
              setSessionCookie('SessionID', null, { path: '/' })
            }

        } catch (error) {
            console.error('Error validating session:', error);
            setLoggedIn(false);
        }
      }
      validateSession();
    }, []); 
  
  return (
    <>
    <Router>
      {!cookies.terms ?
            <div id='cookies'>
            <dl className='title'><span class="material-symbols-outlined">info</span><h2>Cookie Settings</h2></dl>
            <p>This site uses cookies to enhance your experience. Don't worry we dont collect any personal data just data to make sure you stay safe on our site. If you dont like it, well than thats too darn bad.</p>
            <button onClick={accept} className='accept'>Accept</button>
          </div>:
          null
      }
        <Navbar loggedInn={loggedIn}/>
        <Routes>
          {!loggedIn ? <Route path='/Dashboard' element={<DashBoard/>} />: <Route path='/Dashboard' element={<Navigate to='/Sign-in' />} />}
          <Route path='/schedule-Meeting' element={<Meeting loggedInn={loggedIn} />}  />
          <Route path='/' element={<Main/>} />
          <Route path='/services' element={<Service/>} />
          <Route path='/career' element={<Career/>} />
          <Route path='/api' element={<Api/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/application' element={<Application/>} />
          <Route path='/Sign-in' element={loggedIn ? <Navigate to='/Dashboard'/> : <Signin/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
