import './section1.css'

function section1(){

    return(
        <section id='section1'>
            <div className='container'>
                <img src="images/bg1.png" alt="" />   
                <div className='header'>
                    <h1 className='text'>Modernizing Business's One Application at a time</h1>
                <section className='bottom'>
                    <a href='/Schedule-Meeting'><span class="material-symbols-outlined">event</span>Schedule An Appointment Now!</a>
                </section>
                </div> 
            </div>
        </section>
    )
}

export default section1;