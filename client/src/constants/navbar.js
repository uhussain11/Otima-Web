import { Link } from 'react-router-dom'
import './navbar.css'
import React, {useState, useEffect} from 'react'
import { validSession } from '../config';

function Navbar({loggedInn}){

    if(loggedInn){
        return(
            <section id='navbar'>
            <div className='title-container'>
                <Link className='nav-btn' to={'/'}><p>Otima Web</p></Link>
                {/* <img src="./logo.png" alt="" /> */}
            </div>
            <Link className='btn-container' to={'/api'}>
                <p className='nav-btn' >API's</p>
            </Link>
            <Link className='btn-container' to={'/services'}>
                <p className='nav-btn' >Services</p>
            </Link>
            <Link className='btn-container' to={'/career'}>
                <p className='nav-btn'>Career</p>
            </Link>
            <div className='about-container' >
                <Link className='nav-btn' to={'/about'}>Sign Out</Link>
            </div>
        </section>
        )
    }
    else{
        return(
            <section id='navbar'>
            <div className='title-container'>
                <Link className='nav-btn' to={'/'}><p>Otima Web</p></Link>
                {/* <img src="./logo.png" alt="" /> */}
            </div>
            <Link className='btn-container' to={'/api'}>
                <p className='nav-btn' >API's</p>
            </Link>
            <Link className='btn-container' to={'/services'}>
                <p className='nav-btn' >Services</p>
            </Link>
            <Link className='btn-container' to={'/career'}>
                <p className='nav-btn'>Career</p>
            </Link>
            <div className='about-container' >
                <Link className='nav-btn' to={'/about'}>About Us</Link>
            </div>
        </section>
        )
    }
}

export default Navbar;