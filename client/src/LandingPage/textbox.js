import section1 from './section1';
import './textbox.css'
import React,{useState, useEffect} from 'react';

const SERVER = 'http://localhost:8080/api'
const TOTALQUESTIONS = 4;

function TextBox({setViewBox}){
    const [currQuestion, setCurrQuestion] = useState('What type of Website Format are you looking for');
    const [options, setOptions] = useState(['LandingPage', 'ECommerce', 'Service Provider', 'Other']);
    const [question, setQuestion] = useState(1);
    const [price, setPrice] = useState(0);
    const [complete, setComplete] = useState(false);
    const [maitnancefee, setMaitnance] = useState(75);
    const [multiSelect, setMultiSelect] = useState(false);
    const [progress, setProgress] = useState(0)
    const multiOptions = new Map();


    useEffect(()=>{
        const value = (progress/TOTALQUESTIONS)*100
        document.querySelector('.progressBar').style.width = `${value}%`
    }, [progress])

    function removeBubble(){
        setViewBox(false);
    }

    function selected(e){

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
                   setProgress(progress+1);
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
        if(e.target.value === 'true'){
            multiOptions.set(e.target.id, false);
            e.target.className = 'selection';
            e.target.value = 'false';
        }
        else{
            multiOptions.set(e.target.id, true);
            e.target.className = 'selected';
            e.target.value = 'true';
        }
    }

    function next(){
        if(multiOptions.size < 1){
            return
        }

        const selected=[];

        for (let [key, value] of multiOptions) {
            if(value){
                selected.push(key);
            }
        }

        console.log(question)

        const data = {
            selected: selected,
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
                   setPrice(data.price);
                   setCurrQuestion(data.question);
                   setOptions(data.options);
                   setMaitnance(data.maitnance);
                   setMultiSelect(data.multiSelect);
                   setProgress(progress+1);
                }
              });
        }
        catch{
            alert("Something went wrong on our end. Please try again later")
            return;
        }
        setQuestion(question+1)
    }

    return(
        <div className='textBox'>
            <button onClick={removeBubble} className='remove'><span id='exit' class="material-symbols-outlined">arrow_back</span></button>
            <span id='chatBox'>
                <h2 className='welcome'>Welcome to Otima. Select your interests <br /> We'll try our best to provide you with a price estimate or more info</h2>
                {
                    question<=TOTALQUESTIONS && !complete ? 
                    <section id='content'>
                        <h3 className='question'>{currQuestion}?</h3>
                        {multiSelect ?
                        <div className='mutli-selections'>
                            {options.map((item, index) => (
                            < button className='selection' onClick={e =>toggle(e)} value={false} id={index} key={index}> {item}</button>
                            ))}
                            <button className='continue' onClick={next}>Next</button>
                        </div>:
                        <div className='selections'>
                            {options.map((item, index) => (
                            <button className='selection' onClick={e =>selected(e)} value={index} key={index}> {item}</button>
                            ))}
                        </div>
                        }
                    </section>:
                    <section id='content'>
                        <h3 className='result'>Your inital Payment Estimate is ~ <strong>${price}</strong></h3>
                        <h3 className='result'>Your yearly Maintnace Estimate is ~ <strong>${maitnancefee}</strong></h3>
                        <p className='warn'>These values are meant to offer an estimate, prices are not exact and will most likely vary</p>
                    </section>
                }
                <dl className='progressBar'></dl>
            </span>
        </div>
    )
}

export default TextBox;