import './banner.css'

function Banner({position, payment, experience, description, available}){

    return(
        <div className="banner">
            <div className='header'>
                <h1>{position}</h1>
                {available?
                    <p className="available">Available</p>:
                    <p className="unavailable">Unavailable</p>
                }
            </div>
            <h4 className='price'>${payment}</h4>
            <p> <strong>Experience</strong> <br /> {experience}</p>
            <p><strong> Job Description </strong> <br /> {description}</p>
        </div>
    )
}

export default Banner;