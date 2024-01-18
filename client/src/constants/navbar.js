import { Link } from 'react-router-dom'
import './navbar.css'

function navbar(){

    return(
        <section id='navbar'>
            <div className='title-container'>
                <Link className='nav-btn' to={'/'}><p>Otima Web</p></Link>
            </div>
            <Link className='btn-container'>
                <p className='nav-btn' >Contact</p>
            </Link>
            <Link className='btn-container' to={'/services'}>
                <p className='nav-btn' >Services</p>
            </Link>
            <Link className='btn-container'>
                <p className='nav-btn'>Career</p>
            </Link>
            <div className='about-container'>
                <Link className='nav-btn'>About Us</Link>
            </div>
        </section>
    )
}

export default navbar;