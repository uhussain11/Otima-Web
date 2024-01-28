const SERVER = 'http://localhost:8080/api'

async function validSession({sessionID}){
    const url = new URL(`${SERVER}/sessionValidation/`);
    url.searchParams.append('session', sessionID);

    console.log('VALIDAION CHECK')

    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => res.json())
    .then((data)=>{
      return data.valid
    });
  }

export {SERVER, validSession};