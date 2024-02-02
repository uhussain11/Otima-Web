import React,{useState, useEffect} from "react";
import Ticket from "../components/ticket";
import './section2.css'

function Selection2({ data }) {
    const [dropDown, setDropDown] = useState(null)

    function handleTicket(){
        return false;
    }

    return (
      <section id="tickets">
        <div className={data === null ? 'loading' : 'loaded'}>
            <form className="new-ticket" onSubmit={handleTicket}>
                <h2>Submit Ticket</h2>
                <textarea  className="text" placeholder="Write Request"></textarea>
                <input className="ticket-btn" type="submit" value={'Send'} />
            </form>
          {data !== null && (
            <React.Fragment>
              <div className="tickets">
                {data.map((ticket) => (
                    <Ticket key={ticket.id} id={ticket.id} user={ticket.user} message={ticket.message} status={ticket.status}
                    dropDown={dropDown} setDropDown={setDropDown}/>
                ))}
              </div>
            </React.Fragment>
          )}
        </div>
      </section>
    );
  }
  

export default Selection2;