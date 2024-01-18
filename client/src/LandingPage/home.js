import React, {useState} from 'react';

import Section1 from './section1'
import Section2 from './section2'
import Section3 from './section3'
import Section4 from './section4'
import Section5 from './section5'
import TextBox from './textbox'
import './home.css'

function Home(){
    const [viewBox, setViewBox] = useState(false);
    
        
    window.addEventListener('scroll', onScroll);
    function onScroll(){
        if(window.location.pathname === '/'){
            let showAt =  document.querySelector('#section5').offsetHeight + 300;
            if(window.scrollY >= showAt){
                    document.querySelector('.triangle').style.animationPlayState='running';
            }
    
        }
    }

    function removeBubble(){
        document.querySelector('#const').style.display='none';
    }

    function openTextBox(){
        setViewBox(true);
    }

    return(
        <body>
            <Section1/>
            <Section2/>
            <Section3/>
            <Section4/>
            <Section5/>
            <div id='const'> 
            {!viewBox ?             
            <button className='textBox'>
                <button onClick={removeBubble} className='remove'><span id='exit' class="material-symbols-outlined">close</span></button>
                <span onClick={openTextBox} id='icon' class="material-symbols-outlined">sms</span>
            </button>:
            <TextBox
            setViewBox = {setViewBox}
            />}

            </div> 
        </body>
    )
}

export default Home;