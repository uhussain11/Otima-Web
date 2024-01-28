import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './main.css'
import Login from '../components/login'
import React, {useState} from 'react'

function Main(validated){
    const [date, changeDate] = useState(new Date());
    const [loggedIn, setLoggedIn] = useState(validated)

    function changeValue(val) {
        changeDate(val);
     }

    return(
        <section id='main'>
            <h1>Schedule a Meeting</h1>
            {loggedIn? 
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
                <div>
                <h4 className='schedule-acc'> Create an Account </h4>
                <Login
                setLoggedIn = {setLoggedIn}
                showLogin = {false}
                />
                </div>
            }
        </section>
    )
}

export default Main;