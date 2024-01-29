import React from "react";
import './alert.css'

function Alert({message}){
    
    return(
        <nav id="alert"> 
            <section className="message">
                <p>{message}</p>
            </section>
        </nav>
    )
}

export default Alert;