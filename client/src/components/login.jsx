import * as jose from 'jose'
import './login.css'
import React, {useState, useEffect} from 'react'
import { useCookies } from "react-cookie";
import { SERVER } from '../config';

function Login({ setName, setLoggedIn, showLogin}){
    const [fn, setFN] = useState('test')
    const [ln, setLN] = useState('test')
    const [email, setEmail] = useState('test')
    const [password, setPassword] = useState('test')
    const [confirmation, setConfirmation] = useState('test')
    const [login, setLogin] = useState(showLogin)
    const [loading, setLoading] = useState(false)

    const [failedLogin, setFailedLogin] = useState(false);

    const [cookies, setCookie] = useCookies(['SessionID']);

    useEffect(() =>{
        window.google.accounts.id.initialize({
            client_id: '131856816778-kgbf58dn5r2uql5fgdvmmrvcmb40ded4.apps.googleusercontent.com',
            callback: responseGoogle
          });
          window.google.accounts.id.renderButton(
              document.getElementById('buttonDiv'),
              {theme: "filled", size: "large"}
          )
          window.google.accounts.id.prompt();
      }, [window.onload]) 

    const responseGoogle = response =>{
        try{
            setLoading(true);
            const code = response;

            const data = jose.decodeJwt(code.credential)
            console.log(data)
            setName(data.name);

            fetch(`${SERVER}/google-signin/`, {
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
                setCookie('SessionID', 12345678);
              });
        }
        catch{
            alert("Something went wrong on our end. Please try again later")
            return;
        }
    }

    function register(e){
        e.preventDefault();

        const data = {
            fn: fn,
            ln: ln,
            email: email,
            pswrd: password,
            googleID: null,
        }

        fetch(`${SERVER}/register/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({data})
          })
          .then((res) => res.json())
          .then((data)=>{
            if(data.success){
                setLoggedIn(true);
                setFailedLogin(false);
                setCookie('SessionID', data.sessionID, { path: '/' });
            }
            else{
                setFailedLogin(true);
            }
          });
          
        return true;
    }

    function signIn(e){
        e.preventDefault();

        const credentials = {
            email: email,
            pswrd: password
        }

        fetch(`${SERVER}/login/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({credentials})
          })
          .then((res) => res.json())
          .then((data)=>{
            console.log(data)
            if(data.success && data.newSession){
                setCookie('SessionID', data.sessionID, { path: '/' });
                setLoggedIn(true);
            }
            else{
                setFailedLogin(true);
            }
          });
          
        return true;
    }


    return(
        <section id='login'>
            {login ?
                <form className='manual' action="" onSubmit={signIn}>
                    <div className='input'>
                        <label className={email !== "" ? 'placeholder':'placeholder-empty'}> <p>Email</p> </label>
                        <input type="text" onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
                    </div>
                    <div className='input'>
                        <label className={password !== "" ? 'placeholder':'placeholder-empty'}> <p>Password</p> </label>
                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} required/>
                    </div>
                    {failedLogin ? <p className='invalid'>Invalid Credentials</p>: null}
                    <input type="submit" value='Login' className='submit-btn' />
                </form>:
                <form className='manual' onSubmit={register}>
                    <div className='name'>
                        <div className='input'>
                            <label className={fn !== "" ? 'placeholder':'placeholder-empty'}> <p>First Name</p> </label>
                            <input type="text" onChange={(e)=>{setFN(e.target.value)}} value={fn} required/>
                        </div>
                            <div className='input'>
                            <label className={ln !== "" ? 'placeholder':'placeholder-empty'}> <p>Last Name</p> </label>
                            <input type="text" onChange={(e)=>{setLN(e.target.value)}} value={ln} required/>
                        </div>
                        </div>
                    <div className='input'>
                        <label className={email !== "" ? 'placeholder':'placeholder-empty'}> <p>Email</p> </label>
                        <input type="text" onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
                    </div>
                    <div className='input' id={password !== confirmation ? 'error' : null}>
                        <label className={password !== "" ? 'placeholder':'placeholder-empty'}> <p>Password</p> </label>
                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} required/>
                    </div>
                    <div className='input' id={password !== confirmation ? 'error' : null}>
                        <label className={confirmation !== "" ? 'placeholder':'placeholder-empty'}> <p>Confirm Password</p> </label>
                        <input type="password" onChange={(e)=>{setConfirmation(e.target.value)}} value={confirmation} required/>
                    </div>
                    {failedLogin ? <p className='failed'>The Provided Email is already in Use</p>: null}
                    <input type="submit" onClick={(e) =>register} value='Register' className='submit-btn' />
                </form>}
            <div className='alternate'><dl className='line'></dl> or <dl className='line'></dl></div>
            <div id='buttonDiv'></div>
            <a className='swap' onClick={()=>{setLogin(!login)}}> {!login ? 'Already have an Account? Login': 'Dont Have an Account? Create one'}</a>
        </section>
    )

}

export default Login;