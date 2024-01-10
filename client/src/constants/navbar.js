import { Link } from 'react-router-dom'
import './navbar.css'

function navbar(){

    return(
        <section id='navbar'>
            <div className='title-container'>
                <Link className='nav-btn'><p>Otima Web</p></Link>
            </div>
            <div className='btn-container'>
                <Link className='nav-btn'>Contact</Link>
            </div>
            <div className='btn-container'>
                <Link className='nav-btn'>Services</Link>
            </div>
            <div className='btn-container'>
                <Link className='nav-btn'>Career</Link>
            </div>
            <div className='about-container'>
                <Link className='nav-btn'>About Us</Link>
            </div>
        </section>
    )
}

export default navbar;