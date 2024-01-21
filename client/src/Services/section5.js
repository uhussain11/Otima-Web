import './section5.css'
import React, {useState} from 'react';

function Section5(){
    const [question1, showQuestion1] = useState(false);
    const [question2, showQuestion2] = useState(false);
    const [question3, showQuestion3] = useState(false);
    const [question4, showQuestion4] = useState(false);
    const [question5, showQuestion5] = useState(false);
    const [question6, showQuestion6] = useState(false);

    return(
        <section id="section5s">
            {/* <h2 className='title'>More Information</h2> */}
            <div className='option'>
                 <dd className={question1 ? 'header-down': 'header'} onClick={()=>{showQuestion1(!question1)}}> <span class="material-symbols-outlined"> arrow_drop_down </span> <h3>What is the Yearly Maintenance Fee?</h3> </dd>
                <p className={question1 ? 'content': 'hide-content'}>
                    The yearly maintnace fee covers all hosting and maintnace costs for your website. Any issues with the website will result in our immediate efforts to restore it back at no additional cost. This also includes costs to reserving your domain.
                    Your <strong>first month of Maintnace fees is free</strong> and you will be charged yearly following a month from the deployment of your production build.
                </p>
                <dl className='line'></dl>
            </div>
            <div className='option'>
                <dd className={question2 ? 'header-down': 'header'} onClick={()=>{showQuestion2(!question2)}}> <span class="material-symbols-outlined"> arrow_drop_down </span> <h3>What does the Intial Fee Cover?</h3> </dd>
                <p className={question2 ? 'content': 'hide-content'}>
                    The Inital Fee covers all production costs of the website, This <strong>does not</strong> include the first year maintnace fee, but <strong>does </strong> include
                    the first year domain rights fee. This will result in a slightly lower yearly maintnace fee for the first year if you require a domain.
                </p>
                <dl className='line'></dl>
            </div>
            <div className='option'>
                <dd className={question3 ? 'header-down': 'header'} onClick={()=>{showQuestion3(!question3)}}> <span class="material-symbols-outlined"> arrow_drop_down </span> <h3>Refer a friend</h3> </dd>
                <p className={question3 ? 'content': 'hide-content'}>
                    Refering a friend earns you and your friend credits to save on yearly maintance fees. For each friend you refer, you each receive <strong>$40 credit</strong> towards maintnace fees. 
                    Keep in mind if your credits go over your yearly maintance fee they transfer over to the next year until they're depleted.
                </p>
                <dl className='line'></dl>
            </div>
            <div className='option'>
                <dd className={question4 ? 'header-down': 'header'} onClick={()=>{showQuestion4(!question4)}}> <span class="material-symbols-outlined"> arrow_drop_down </span> <h3>How Accurate is my Estimate?</h3> </dd>
                <p className={question4 ? 'content': 'hide-content'}>
                    It's not 100% accurate. In order to try and provide you with the most accurate pricing for your project we would need to schedule a brief meeting or receive a brief report explaining
                    what your business does and what they plan to achieve with obtaining a website. The cost estimate is meant to show you a estimate of possible prices based off what most business' we've worked
                    with desire.
                </p>
                <dl className='line'></dl>
            </div>
            <div className='option'>
                <dd className={question5 ? 'header-down': 'header'} onClick={()=>{showQuestion5(!question5)}}> <span class="material-symbols-outlined"> arrow_drop_down </span> <h3>Paying for prototype</h3> </dd>
                <p className={question5 ? 'content': 'hide-content'}>
                    Your <strong>Initial fee includes the protype fee</strong> you must pay prior to us creating the production build. This price is typically less than 10% of the entire
                    initial payment fee. For this price we provide you with a prototype of what the website would look and function like. If you would like, you may choose to pay the full initial price prior to final production build.
                </p>
                <dl className='line'></dl>
            </div>
            <div className='option'>
                <dd className={question6 ? 'header-down': 'header'} onClick={()=>{showQuestion6(!question6)}}> <span class="material-symbols-outlined"> arrow_drop_down </span> <h3>I want to Update My Website after production build</h3> </dd>
                <p className={question6 ? 'content': 'hide-content'}>
                    That is totally possible! Reach out to us so we can see what information you'd like to add to your website. Depending on how significant the update is we may charge you a fee.
                </p>
                <dl className='line'></dl>
            </div>
        </section>
    )
}

export default Section5;