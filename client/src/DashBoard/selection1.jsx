import './selection1.css'
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function Selection1({data}){
    const [showConfirmation, setShowConfirmation] = useState(null);
    const [first, setFirst] = useState('xxxx');
    const [last, setLast] = useState('xxxxx');
    const [email, setEmail] = useState('xxxx@otima.com');
    const [projects, setProjects] = useState([{id:0, domain:'test.com', price: 200, renewal: '03/03/2003'}, {id:1, domain:'test.com', price: 200, renewal: '03/03/2003'}, {id:2, domain:'test.com', price: 200, renewal: '03/03/2003'}, {id:3, domain:'test.com', price: 200, renewal: '03/03/2003'}])
    const [business, setBusiness] = useState(null)

    useEffect(()=>{
        if(data === null){
            return;
        }else{
            setFirst(data.first)
            setLast(data.last)
            setEmail(data.email)
            setBusiness(data.business)
            setProjects(data.projects)
        }
    },[data])

    function confirmation(id){
        setShowConfirmation(id)
    }

    function cancel(){
        setShowConfirmation(null)
    }

    return(
        <section id="overView">
            <div className={ data === null ?'loading':'loaded'}>
           <div className="top">
               <p>Welcome, </p>
               <h1>{first} {last}</h1>
           </div>
           <div className="middle">
               <h2>{business}</h2>
               <p>{email}</p>
           </div>
           <div className="bottom">
               <h2>Projects</h2>
               <ul className='projects'>
                   {projects.map((project, index)=> (
                       <li key={index} className='card'>
                            <div className={showConfirmation === project.id ?'confirmation-shown':'confirmation-hidden'}>
                                <p>Confirmation</p>
                                <p>Website will go bye bye</p>
                                <div className='options'>
                                    <button className='nay'> Yes Please</button>
                                    <button className='yay' onClick={cancel}>NO, I like my website</button>
                                </div>
                            </div>
                           <div className='top-info'>
                                <p className='id'>ID: {project.id}</p>
                               <a href={`https://${project.domain}`} className='link' target="_blank" rel="noopener noreferrer">{project.domain}</a>
                           </div>
                           <div className='info'>
                                <dl className='stack'>
                                    <h3 className='price' >${project.price}</h3>
                                    <p>Yearly</p>
                                </dl>
                                <dl className='stack'>
                                    <h3>Renewal Date</h3>
                                    <p>{project.renewal}</p>
                                </dl>
                           </div>
                           <button className='cancel' onClick={(id) =>{confirmation(project.id)}}>Un-Deploy</button>
                       </li>
                   ))}
               </ul>
           </div>
           </div>
        </section>
    )
}

export default Selection1;