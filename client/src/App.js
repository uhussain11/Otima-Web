import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Main from './LandingPage/home';
import Service from './Services/main';
import Navbar from './constants/navbar'
import Footer from './constants/footer'

function App() {

  
  return (
    <>
    <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/services' element={<Service/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
