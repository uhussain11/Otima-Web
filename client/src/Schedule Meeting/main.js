import * as jose from 'jose'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './main.css'

import React, {useState, useEffect} from 'react'
const SERVER = 'http://localhost:8080/api'

function Main(){
    const [loading, setLoading] = useState(false)
    const [date, changeDate] = useState(new Date());
    const [loggedIn, setLoggedIn] = useState(false)
    const [name, setName] = useState('tester')

    useEffect(() =>{
        if(!loggedIn){
            window.google.accounts.id.initialize({
                client_id: '131856816778-kgbf58dn5r2uql5fgdvmmrvcmb40ded4.apps.googleusercontent.com',
                callback: responseGoogle
              });
              window.google.accounts.id.renderButton(
                  document.getElementById('buttonDiv'),
                  {theme: "outline", size: "large"}
              )
              window.google.accounts.id.prompt();
        }
      }, [window.performance.navigation.type]) 

    const responseGoogle = response =>{
        try{
            setLoading(true);
            const code = response;

            const data = jose.decodeJwt(code.credential)
            console.log(data)
            setName(data.name);

            fetch(`${SERVER}/login/`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({data})
              })
              .then((res) => res.json())
              .then((data)=>{
                setLoggedIn(true);
                console.log(data)
              });
        }
        catch{
            alert("Something went wrong on our end. Please try again later")
            return;
        }
    }

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

                    <p>This Meeting will be brief (15-30 minutes)</p>
                    <p>Availability is Tues, Thur, Sat, Sun; 9am-8pm EST</p>
                    <input className='submit-btn' type="submit" value={"Schedule"} />
                </form>:  
                <section action="" id='login'>
                    <form className='manual' action="">
                        <div className='name'>
                            <input type="text" placeholder='First Name' required/>
                            <input type="text" placeholder='Last Name' required/>
                        </div>
                        <input type="email" placeholder='Email' required/>
                        <input type="password" placeholder='Password' required/>
                        <input type="password" placeholder='Confrim Password' required/>
                        <input type="submit" value='Create Account' />
                    </form>
                    <div>or</div>
                    <div id='buttonDiv'></div>
                </section>
            }
        </section>
    )
}

export default Main;