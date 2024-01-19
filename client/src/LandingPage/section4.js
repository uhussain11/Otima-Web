import './section4.css'
import React from 'react';

function section4(){

    const handleSubmit = event =>{
        event.preventDefault();
    }

    return(
        <section id='section4l'>
            <div className='sector'>
                <form className='contact-form' onSubmit={handleSubmit} action="">
                    <input type="text" placeholder='Company Name' required/>
                    <div className='name'>
                        <input type="text" placeholder='First Name' required/>
                        <input type="text" placeholder='Last Name' required/>
                    </div>
                    <input type="text" placeholder='Email' />
                    <input type="text" placeholder='Phone #' />
                    <textarea name="" id="" cols="30" rows="6" placeholder='Brief Us '></textarea>
                    <button className='submit-btn'>Send</button>
                </form>
            </div>

            <div className='title-sector'>
                <h2>Contact <br /> Us</h2>
                <p>lets get you started</p>
                <a href="">561-990-6831</a>
                <a href="">Brian03032003@gmail.com</a>
            </div>
        </section>
    )
}

export default section4;