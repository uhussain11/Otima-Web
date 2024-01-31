import { Link } from 'react-router-dom'
import './navbar.css'
import React, { useState, useEffect } from 'react'
import { useCookies } from "react-cookie";
import { SERVER } from '../config';
import Alert from '../components/alert';
import {isMobile} from 'react-device-detect';

function Navbar({loggedInn}){
    const [cookies, setCookie, removeCookie] = useCookies(["sessionID"]);
    const [loggedOutAlert, setLoggedOutAlert] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const isLoggedOut = localStorage.getItem('loggedOut');
        
        if (isLoggedOut) {
          localStorage.removeItem('loggedOut');
          
          setLoggedOutAlert(true);
        }
      }, []);

    function logout(){
        try{
            fetch(`${SERVER}/logout`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({sessionID: cookies.SessionID})
              })
              .then((res) => res.json())
              .then((data)=>{
                console.log(data)
                if(data.success){
                    localStorage.setItem('loggedOut', 'true');
                    setLoggedOutAlert(true);
                    setCookie('SessionID', null, { path: '/' });
                    window.location.href = `/`;
                }
              });
        }
        catch{
            alert("Something went wrong on our end. Please try again later")
            return;
        }
    }

    function dropDown(){
        setMenuOpen(!menuOpen)
    }
    function close(){
        setMenuOpen(false)
    }

    if(isMobile){
        return(
            <div className='navigation-container'>
                {loggedOutAlert? <Alert message={'Successfully Logged Out'}/>:null}
                {loggedInn?
                <section id={menuOpen ?'navbar-mobile' : 'navbar-mobile-hidden'}>
                    <dl className='navbar'>
                            <Link className='btn-container' to={'/'} onClick={close}>
                                <img className='nav-btn' src="./logo.png" alt="" />
                            </Link>
                            <Link className='title-container' onClick={dropDown}>
                                {!menuOpen ? <span class="material-symbols-outlined">menu</span>: <span class="material-symbols-outlined">close</span>}
                            </Link>
                        </dl>
                        <div className='selections'>
                            <Link className='btn-container' to={'/api'} onClick={dropDown}>
                                <p className='nav-btn' >API's</p>
                            </Link>
                            <Link className='btn-container' to={'/services'} onClick={dropDown}>
                                <p className='nav-btn' >Services</p>
                            </Link>
                            <Link className='btn-container' to={'/career'} onClick={dropDown}>
                                <p className='nav-btn'>Career</p>
                            </Link>
                            <Link className='btn-container' to={'/Sign-in'} onClick={dropDown}>
                                <p className='nav-btn'>DashBoard <span class="material-symbols-outlined">dashboard</span></p>
                            </Link>
                            <Link className='btn-container-logout' to={'/'} onClick={logout}>
                                <p className='nav-btn' ><span class="material-symbols-outlined">logout</span></p>
                            </Link>
                        </div>
                </section>:
                    <section id={menuOpen ?'navbar-mobile' : 'navbar-mobile-hidden'}>
                        <dl className='navbar'>
                            <Link className='btn-container' to={'/'} onClick={close}>
                                <img className='nav-btn' src="./logo.png" alt="" />
                            </Link>
                            <Link className='title-container' onClick={dropDown}>
                                {!menuOpen ? <span class="material-symbols-outlined">menu</span>: <span class="material-symbols-outlined">close</span>}
                            </Link>
                        </dl>
                        <div className='selections'>
                            <Link className='btn-container' to={'/api'} onClick={dropDown}>
                                <p className='nav-btn' >API's</p>
                            </Link>
                            <Link className='btn-container' to={'/services'} onClick={dropDown}>
                                <p className='nav-btn' >Services</p>
                            </Link>
                            <Link className='btn-container' to={'/career'} onClick={dropDown}>
                                <p className='nav-btn'>Career</p>
                            </Link>
                            <Link className='btn-container' to={'/Sign-in'} onClick={dropDown}>
                                <p className='nav-btn'>Account <span class="material-symbols-outlined">person</span></p>
                            </Link>
                        </div>
                    </section>
                }
            </div>
        )
    }
    else{
        return(
            <div className='navigation-container'>
                {loggedOutAlert? <Alert message={'Successfully Logged Out'}/>:null}
                {loggedInn?
                <section id='navbar-logged-in'>
                    <Link className='btn-container-logout' to={'/'} onClick={logout}>
                        <p className='nav-btn' ><span class="material-symbols-outlined">logout</span></p>
                    </Link>
                    <Link className='title-container' to={'/'}>
                        {/* <Link className='nav-btn' to={'/'}><p>Otima Web</p></Link> */}
                        <img className='nav-btn' src="./logo.png" alt="" />
                    </Link>
                    <Link className='btn-container' to={'/api'}>
                        <p className='nav-btn' >API's</p>
                    </Link>
                    <Link className='btn-container' to={'/services'}>
                        <p className='nav-btn' >Services</p>
                    </Link>
                    <Link className='btn-container' to={'/career'}>
                        <p className='nav-btn'>Career</p>
                    </Link>
                    <div className='symbol-container' >
                        <Link className='nav-btn' to={'/dashboard'}><span class="material-symbols-outlined">dashboard</span></Link>
                    </div>
                </section>:
                    <section id='navbar'>
                        <Link className='title-container' to={'/'}>
                        {/* <Link className='nav-btn' to={'/'}><p>Otima Web</p></Link> */}
                            <img className='nav-btn' src="./logo.png" alt="" />
                        </Link>
                        <Link className='btn-container' to={'/api'}>
                            <p className='nav-btn' >API's</p>
                        </Link>
                        <Link className='btn-container' to={'/services'}>
                            <p className='nav-btn' >Services</p>
                        </Link>
                        <Link className='btn-container' to={'/career'}>
                            <p className='nav-btn'>Career</p>
                        </Link>
                        <div className='symbol-container' >
                            <Link className='nav-btn' to={'/Sign-in'}> <span class="material-symbols-outlined">person</span></Link>
                        </div>
                    </section>
                }
            </div>
        )
    }
}

export default Navbar;