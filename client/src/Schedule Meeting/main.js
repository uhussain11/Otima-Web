import * as jose from 'jose'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './main.css'

import React, {useState, useEffect} from 'react'
const SERVER = 'http://localhost:8080/api'

function Main(){
    const [loading, setLoading] = useState(false)
    const [date, changeDate] = useState(new Date());
    const [loggedIn, setLoggedIn] = useState(true)
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
                <section id='form'>
                    <h4 className='name-tag'>Lets get started <strong>{name}</strong></h4>
                    <p className='info'> Please select a date and time for a brief online zoom meeting</p>
                    <Calendar onChange = {changeDate} value = {date}/>
                    <p className='selectedDate'>{date.toLocaleDateString()}</p>
                    <div className='time-selection'>
                        <p>Select a Time:</p>
                        <input  type="time" className='time-selection'/>
                        <select name="timeZone" id="timezone"> 
                            <option value="EST">EST</option>
                            <option value="ECT">ECT</option>
                            <option value="PST">PST</option>
                            <option value="UTC">UTC</option>
                            <option value="EST">EST</option>

                        </select>
                    </div>

                    <p>This Meeting should</p>
                </section>:  <div id='buttonDiv'></div>
            }
        </section>
    )
}

export default Main;