import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, {useEffect} from 'react';
import Main from './LandingPage/home';
import Service from './Services/main';
import Career from './Career/main';
import Application from './Career/application';
import Meeting from './Schedule Meeting/main';
import Api from './API/main';

import Navbar from './constants/navbar';
import Footer from './constants/footer';
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies(['terms']);

  function accept(){
    document.getElementById('cookies').style.animation = 'cookie-remove 600ms ease 0s 1 forwards';
    setTimeout(() => {
      setCookie('terms', true);
    }, 600);  }
  
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
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/services' element={<Service/>} />
          <Route path='/career' element={<Career/>} />
          <Route path='/api' element={<Api/>} />
          <Route path='/application' element={<Application/>} />
          <Route path='/schedule-Meeting' element={<Meeting/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
