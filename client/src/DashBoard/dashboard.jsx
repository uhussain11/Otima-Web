import './dashboard.css'
import React ,{useState, useEffect} from 'react'
import Cookies from 'js-cookie';
import { SERVER } from '../config'

import Selection1 from './selection1'
import Selection2 from './selection2'
import Selection3 from './selection3'


function Dashboard(){
    const [selection, setSelection] = useState(0)
    const [loading, setLoading] = useState(true)

    const [obtained1, setObtained1] = useState(false)
    const [obtained2, setObtained2] = useState(false)
    const [obtained3, setObtained3] = useState(false)

    const [first, setFirst] = useState('xxxx');
    const [last, setLast] = useState('xxxxx');
    const [email, setEmail] = useState('xxxx@otima.com');
    const [projects, setProjects] = useState([{id:0, domain:'test.com', price: 200, renewal: '03/03/2003'}, {id:1, domain:'test.com', price: 200, renewal: '03/03/2003'}, {id:2, domain:'test.com', price: 200, renewal: '03/03/2003'}, {id:3, domain:'test.com', price: 200, renewal: '03/03/2003'}])
    const [tickets, setTickets] = useState([{id:1, message:'skdjfbkjsd fdjfbksjdf dsjfbkj dfjkbdf sdkjf sdkf dsf dskf'}, {id:3, message:'skdjfbkjsd fdjfbksjdf dsjfbkj dfjkbdf sdkjf sdkf dsf dskf'}])

    const select = (selected) => {
        const moveSelection = document.getElementById('shadow-selected');
        setSelection(selected);

        switch(selected){
            case 0:
                moveSelection.style.top = `${100 * selected}%`
                break;
            case 1:
                moveSelection.style.top = `${100 * selected}%`
                break;
            case 2:
                moveSelection.style.top = `${100 * selected}%`
                break;
        }
    }

    const setTabData = async (tab) =>{

        // defiens tab we getting
        let fetchTab = null;

        // set which tab is needed
        fetchTab = (!obtained1 && tab === 0) ? tab : (!obtained2 && tab === 1) ? tab : (!obtained3 && tab === 2) ? tab : fetchTab;

        // all tabs loaded return
        if(fetchTab === null){
            return
        }

        const sessionID = Cookies.get('SessionID');
        const url = new URL(`${SERVER}/data-request/`);
        url.searchParams.append('category', fetchTab);
        
        // try {
        //     const response = await fetch(url, {
        //       method: 'GET',
        //       mode: 'cors',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //     });
        
        //     const data = await response.json();
        //     console.log(data)

        //     if(!data.success){
        //         alert('Something went Wrong');
        //         return
        //     }

        //     if(fetchTab === 0){

        //     }
        //     else if(fetchTab === 1){
                
        //     }
        //     else if(fetchTab === 2){
                
        //     }

        //     return;
    
        //   } catch (error) {
        //     console.error('Error during session validation:', error);
        //     return false;
        //   }
    
        console.log(" On tab " + tab)
    }

    useEffect( ()=>{
        const fetchData = async () => {
            setLoading(true);
            await setTabData(selection);
            setLoading(false);
        };
    
        fetchData();
    
        return () => {
        };

    },[selection])

    function hideNotice(){
        const notice = document.querySelector('.notice');
        notice.className = 'notice-disappear';

    }
    return(
        <body id='dashboard'>
            <div className='notice'>
                <p> Un-Deploys must be requested at least 1 month following the renewal date to be eligible for a refund </p>
                <span onClick={(e) =>hideNotice(e)} class="material-symbols-outlined">close</span>
            </div>
            <section className='left'>
                <ul className='column'>
                    <dl className={selection === 0 ? 'selected':null} onClick={() =>{select(0)}}>
                        <p>OverView</p>
                        <div id='shadow-selected'></div>
                    </dl>
                    <dl className={selection === 1 ? 'selected':null} onClick={() =>{select(1)}}>
                        <p>Tickets</p>
                    </dl>
                    <dl className={selection === 2 ? 'selected':null} onClick={() =>{select(2)}}>
                        <p>User</p>
                    </dl>
                    <div className='note'>
                        <p>For additional information please reach out to <strong>support@otima.com</strong></p>
                    </div>
                </ul>
            </section>
            <section className='right'>
                {selection===0 ? <Selection1 first={first} last={last} email={email} loading={loading} business={'test Org'} projects={projects} /> :null}
                {selection===1 ? <Selection2 tickets={tickets} /> :null}
                {selection===2 ? <Selection3 /> :null}

            </section>
        </body>
    )

}

export default Dashboard;