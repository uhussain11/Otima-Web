import './selection1.css'
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
function Selection1({first, last, email, business, loading, projects}){
    const [showConfirmation, setShowConfirmation] = useState(null)

    function confirmation(id){
        setShowConfirmation(id)
        console.log(id)
    }

    function cancel(){
        setShowConfirmation(null)
    }

    return(
        <section id="overView">
            <div className={loading?'loading':'loaded'}>
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
                   {projects.map((project)=> (
                       <li className='card'>
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