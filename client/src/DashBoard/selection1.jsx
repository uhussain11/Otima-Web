import './selection1.css'
import React, {useState} from 'react';

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
            {!loading?
           <div className='loaded'>
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
                   {projects.map((project, index )=> (
                       <li className='card'>
                            <div className={showConfirmation === project.id ?'confirmation-shown':'confirmation-hidden'}>
                                <p>Are you Sure?</p>
                                <p>Website will go bye bye</p>
                                <div className='options'>
                                    <button className='nay'> Yes Please</button>
                                    <button className='yay' onClick={cancel}>NO, I like my website</button>
                                </div>
                            </div>
                           <div>
                               <h2>ID: {project.id}</h2>
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
           </div>:
           <div className='loading'>
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
                   {projects.map(project => (
                       <li className='card'>
                           <div>
                               <h2>ID: {project.id}</h2>
                           </div>
                           <div className='info'>
                                <dl className='stack'>
                                    <h3 className='price' >${project.price}</h3>
                                    <p>Yearly</p>
                                </dl>
                                <dl className='stack'>
                                    <h3>Renewal Date:</h3>
                                    <p>{project.renewal}</p>
                                </dl>
                           </div>
                           <button className='cancel'>Un-Deploy</button>
                       </li>
                   ))}
               </ul>
           </div>
           </div>}
        </section>
    )
}

export default Selection1;