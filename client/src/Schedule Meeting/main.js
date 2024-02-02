import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './main.css'
import Login from '../components/login'
import React, { useState } from 'react'
import { ThreeDots } from 'react-loading-icons'

function Main({loggedIn}){
    const [date, changeDate] = useState(new Date());

    function changeValue(val) {
        changeDate(val);
     }

    return(
        <section id='main'>
            <h1>Schedule a Meeting</h1>
            {loggedIn !== null ? null:<ThreeDots stroke="whitesmoke" fill='#584082' speed={1.15}/>}
            
            {loggedIn !== null && loggedIn ? 
                <form id='form'>
                    <h4 className='name-tag'> Lets get started </h4>
                    <p className='info'> Please select a date and time for a brief online zoom meeting</p>
                    <Calendar onChange = {changeValue} value = {date}/>
                    <p className='first-text'>This Meeting will be brief (15-30 minutes)</p>
                    <p className='second-text'>Availability is Tues, Thur, Sat, Sun; <strong>9am-8pm</strong> EST</p>
                    <p className='selectedDate'>{date.toLocaleDateString()}</p>
                     <div className='time-selection'>
                        <p>Select a Time:</p>
                        <input  type="time" max="20:00" min="09:00" className='time-selection' required/>
                        <select name="timeZone" id="timezone"> 
                            <option value="EST">EST</option>
                            <option value="ECT">ECT</option>
                            <option value="PST">PST</option>                                        
                            <option value="UTC">UTC</option>
                            <option value="EST">EST</option>
                        </select>
                    </div>
                    <input className='submit-btn' type="submit" value={"Schedule"} />
                </form>:
                null
            }
            {loggedIn !== null && !loggedIn ?
                <div>
                    <h4 className='schedule-acc'> Create an Account </h4>
                    <Login
                    showLogin = {false}
                    navigate = {'/schedule-meeting'}
                    />
                </div>: null}
        </section>
    )
}

export default Main;