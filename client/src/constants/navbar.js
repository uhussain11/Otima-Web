import { Link } from 'react-router-dom'
import './navbar.css'
import React, { useState, useEffect } from 'react'
import { useCookies } from "react-cookie";
import { SERVER } from '../config';
import Alert from '../components/alert';

function Navbar({loggedInn}){
    const [cookies, setCookie, removeCookie] = useCookies(["sessionID"]);
    const [loggedOutAlert, setLoggedOutAlert] = useState(false)

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

    return(
        <div className='navigation-container'>
            {loggedOutAlert? <Alert message={'Successfully Logged Out'}/>:null}
            {loggedInn?
            <section id='navbar-logged-in'>
                <Link className='btn-container-logout' to={'/'} onClick={logout}>
                    <p className='nav-btn' >LogOut</p>
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

export default Navbar;