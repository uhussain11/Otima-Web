import './banner.css'
import React from 'react';

function Banner({position, payment, experience, description, available, id}){

    return(
        <a className="banner" href={available ? `/application?id=${id}`: null}>
            <div className='header'>
                <h1>{position}</h1>
                {available?
                    <p className="available">Open</p>:
                    <p className="unavailable">Closed</p>
                }
            </div>
            <h4 className='price'>${payment}</h4>
            <p> <strong>Experience</strong> <br /> {experience}</p>
            <p><strong> Job Description </strong> <br /> {description}</p>
        </a>
    )
}

export default Banner;