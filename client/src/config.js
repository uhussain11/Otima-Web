import Cookies from 'js-cookie';
import { useCookies } from "react-cookie";

const SERVER = 'http://localhost:8080/api'

async function validSession(){

    const sessionID = Cookies.get('SessionID')
    const url = new URL(`${SERVER}/sessionValidation/`);
    url.searchParams.append('session', sessionID);
    
    try {
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const data = await response.json();
        console.log(data)

        return data.success;
      } catch (error) {
        console.error('Error during session validation:', error);
        return false;
      }
  }

export {SERVER, validSession};