import React from "react";
import './application.css'

function Application(props){
    var currentUrl = window.location.search;
    var urlParams = new URLSearchParams(currentUrl);
    var id = urlParams.get('id');

    console.log(id)

    return(
        <section id="application">
            {id}
            test
        </section>
    )
}

export default Application;