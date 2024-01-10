import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Main from './LandingPage/home';
import Navbar from './constants/navbar'
import Footer from './constants/footer'

function App() {

  
  return (
    <>
    <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
