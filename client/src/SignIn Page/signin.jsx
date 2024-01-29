import Login from "../components/login"
import './signin.css'
import React, {useEffect, useState} from "react"

function Signin(){
const [loggedIn, setLoggedIn] = useState(false)

    useEffect(()=>{
        if(loggedIn){
            window.location.href = `/Dashboard`;
        }
    },[loggedIn])

    return(
        <section id="signin">
            <h1>Account</h1>
            <Login setLoggedIn={setLoggedIn} showLogin={true}/>
        </section>
    )
}

export default Signin