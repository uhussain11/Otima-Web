
import Section1 from './section1'
import Section2 from './section2'
import Section3 from './section3'
import Section4 from './section4'
import Section5 from './section5'

import './home.css'

function home(){

    return(
        <body>
            <Section1/>
            <Section2/>
            <Section3/>
            <Section4/>
            <Section5/>
            <div id='const'><button>Call Now</button></div> 
        </body>
    )
}

export default home;