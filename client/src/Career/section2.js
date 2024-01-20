import './section2.css'
import Job from './banner'
import React, {useState} from 'react'
function Section2(){
    const [display, setDisabled] = useState(true)

    return(
        <section id="section2c">
        {display?
        <div id="section2c">
            <Job
            id={0}
            position = {'Full-Stack Developer'}
            payment = {'Unavailable'}
            experience = {`We're looking for candidates with experience with React, being comfortable with Javascript/HTML/CSS and comfortable working with NodeJs. 
            Experience with SQL and DOM knowledge is a plus.`}
            description = {`This position is NOT a fulltime Job. We would prefer college students looking to make a little bit of money on the side
            while also eager to gain experience. We want to help students gain experience and give them the freedom to explore what their interests are. Payment is offered per
            product created. This position offers a significant amount of flexibility`}
            available = {false}
            />
            <Job
            id={1}
            position = {'IOS/Android App Developer'}
            payment = {'Unavailable'}
            experience = {`We're looking for candidates with experience with Swift, and be able to implement databases (such as firebase or AWS) into an application. 
            Experience with object oriented programming is a plus.`}
            description = {`This position is NOT a fulltime Job. We would prefer college students looking to make a little bit of money on the side
            while also eager to gain experience. We want to help students gain experience and give them the freedom to explore what their interests are. Payment is offered per
            product created. This position offers a significant amount of flexibility`}
            available = {false}
            />
            <Job
            id={2}
            position = {'Graphic Designer'}
            payment = {'Unavailable'}
            experience = {`We're looking for creative candidates whom have expereince designing websites, To qualify for this role you must be very creative and work swiftly.`}
            description = {`This position is NOT a fulltime Job. We would prefer college students looking to make a little bit of money on the side
            while also eager to gain experience. We want to help students gain experience and give them the freedom to explore what their interests are. Payment is offered per
            product created. This position offers a significant amount of flexibility`}
            available = {false}
            />
        </div>:
        <div>
            <h2>No Open Positions at this moment</h2>
        </div>
    }
        </section>
    )
}

export default Section2;