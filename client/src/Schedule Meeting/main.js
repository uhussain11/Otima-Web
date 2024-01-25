import * as jose from 'jose'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './main.css'
import Login from '../components/login'
import React, {useState, useEffect} from 'react'
const SERVER = 'http://localhost:8080/api'

function Main(){
    const [date, changeDate] = useState(new Date());
    const [loggedIn, setLoggedIn] = useState(false)
    const [name, setName] = useState('tester')

    function changeValue(val) {
        changeDate(val);
     }

    return(
        <section id='main'>
            <a className='home-btn' href="/">Otima Web</a>
            <h1>Schedule Meeting</h1>
            {loggedIn? 
                <form id='form'>
                    <h4 className='name-tag'>Lets get started <strong>{name}</strong></h4>
                    <p className='info'> Please select a date and time for a brief online zoom meeting</p>
                    <Calendar onChange = {changeDate} value = {date}/>

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
                <Login
                loggedIn = {loggedIn}
                setName = {setName}
                setLoggedIn = {setLoggedIn}
                />
            }
        </section>
    )
}

export default Main;