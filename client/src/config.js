import Cookies from 'js-cookie';

const SERVER = 'http://localhost:8080/api'

async function validSession(){
    const sessionID = Cookies.get('SessionID')
    const url = new URL(`${SERVER}/sessionValidation/`);
    url.searchParams.append('session', sessionID);

    await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => res.json())
    .then((data)=>{
        console.log(data)
        return true;
    });
  }

export {SERVER, validSession};