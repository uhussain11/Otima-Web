import section1 from './section1';
import './textbox.css'
import React,{useState} from 'react';

const SERVER = 'http://localhost:8080/api'
const TOTALQUESTIONS = 4;

function TextBox({setViewBox}){
    const [currQuestion, setCurrQuestion] = useState('What type of Website Format are you looking for');
    const [options, setOptions] = useState(['LandingPage', 'ECommerce', 'Service Provider', 'Other']);
    const [question, setQuestion] = useState(1);
    const [price, setPrice] = useState(0);
    const [complete, setComplete] = useState(false);
    const [maitnancefee, setMaitnance] = useState(90);
    const [multiSelect, setMultiSelect] = useState(false);

    function removeBubble(){
        setViewBox(false);
    }

    function selected(e){
        console.log(e)

        const data = {
            selected: e.target.value,
            price: price,
            question: question,
            maitnance: maitnancefee,
        };

        try{
            fetch(`${SERVER}/text`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({data})
              })
              .then((res) => res.json())
              .then((data)=>{
                if(data.success){
                   setPrice(data.price)
                   setCurrQuestion(data.question)
                   setOptions(data.options)
                   setMaitnance(data.maitnance)
                   setMultiSelect(data.multiSelect)
                }
              });
        }
        catch{
            alert("Something went wrong on our end. Please try again later")
            return;
        }
        setQuestion(question+1)
    }

    function toggle(e){

    }

    return(
        <div className='textBox'>
            <button onClick={removeBubble} className='remove'><span id='exit' class="material-symbols-outlined">close</span></button>
            <span id='chatBox'>
                <h2 className='welcome'>Welcome to Otima. Select your interests <br /> We'll try our best to provide you with a price estimate or more info</h2>
                {
                    question<=TOTALQUESTIONS && !complete ? 
                    <section>
                        <h3 className='question'>{currQuestion}?</h3>
                        {multiSelect ?
                        <div className='mutli-selections'>
                            {options.map((item, index) => (
                            < button className='selection' onClick={e =>toggle(e)} value={index} key={index}> {item}</button>
                            ))}
                            <button className='continue'>Next</button>
                        </div>:
                        <div className='selections'>
                            {options.map((item, index) => (
                            <button className='selection' onClick={e =>selected(e)} value={index} key={index}> {item}</button>
                            ))}
                        </div>
                        }
                    </section>:
                    <section>
                        <h3 className='question'>Your inital Payment Estimate is ~ <strong>${price}</strong></h3>
                        <h3 className='question'>Your yearly Maintnace estimate is ~ <strong>${maitnancefee}</strong></h3>
                    </section>
                }
            </span>
        </div>
    )
}

export default TextBox;