import { Link } from 'react-router-dom'
import './navbar.css'
import React from 'react'
import { useCookies } from "react-cookie";
import { SERVER } from '../config';

function Navbar({loggedInn}){
    const [cookies, setCookie, removeCookie] = useCookies(["sessionID"]);

    function logout(){
        const sessionID = cookies.SessionID;
        try{

        //     fetch(`${SERVER}/google-signin/`, {
        //         method: 'POST',
        //         mode: 'cors',
        //         headers: {
        //           'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({sessionID: sessionID})
        //       })
        //       .then((res) => res.json())
        //       .then((data)=>{
        //         console.log(data)
        //         if(data.success){
        //             setLoggedIn(true);
        //         }
        //       });
        }
        catch{
            alert("Something went wrong on our end. Please try again later")
            return;
        }
    }

    if(loggedInn){
        return(
            <section id='navbar-logged-in'>
            <Link className='btn-container-logout' to={'/'} onClick={logout}>
                <p className='nav-btn' >LogOut</p>
            </Link>
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
                <Link className='nav-btn' to={'/dashboard'}><span class="material-symbols-outlined">dashboard</span></Link>
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