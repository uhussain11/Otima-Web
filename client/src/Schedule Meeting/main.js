import './main.css'
import {GoogleLogin} from 'react-google-login'

function main(){

    const responseError = error =>{

    }
    const responseGoogle = response =>{

    }

    return(
        <section id='main'>
            <a className='home-btn' href="/">Otima Web</a>
            <h1>Schedule Meeting</h1>

            <div className=''>
                <GoogleLogin 
                clientId='131856816778-kgbf58dn5r2uql5fgdvmmrvcmb40ded4.apps.googleusercontent.com' 
                buttonText='Sign in'
                onSuccess={responseGoogle}
                onFailure={responseError}
                cookiePolicy={'single_host_origin'}

                responseType='code'
                accessType='offline'
                scope='openid email profile https://www.googleapis.com/auth/calendar'
                />
            </div>
        </section>
    )
}

export default main;