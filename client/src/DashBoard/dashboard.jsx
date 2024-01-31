import './dashboard.css'
import React ,{useState, useEffect} from 'react'
import Selection1 from './selection1'
import Selection2 from './selection2'
import Selection3 from './selection3'


function Dashboard(){
    const [selection, setSelection] = useState(0)
    const [loading, setLoading] = useState(true)

    const [first, setFirst] = useState('Bobby');
    const [last, setLast] = useState('Shmurda');
    const [email, setEmail] = useState('test@gmail.com');
    const [projects, setProjects] = useState([{id:0, price: 200, renewal: '05/02/2024'}, {id:1, price: 200, renewal: '05/02/2024'}, {id:2, price: 200, renewal: '05/02/2024'}, {id:3, price: 200, renewal: '05/02/2024'}])

    const select = (selected) => {
        console.log('Display: ' + selected)
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

    useEffect(()=>{
        setInterval(function(){
            setLoading(false)
        }, 3000)
    })

    function hideNotice(e){

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
                {selection===1 ? <Selection2 /> :null}
                {selection===2 ? <Selection3 /> :null}

            </section>
        </body>
    )

}

export default Dashboard;