import React,{useState, useEffect} from "react";
import Ticket from "../components/ticket";
import './section2.css'

function Selection2({ data }) {
    


    return (
      <section id="tickets">
        <div className={data === null ? 'loading' : 'loaded'}>
          {data !== null && (
            <React.Fragment>
              <div className="tickets">
                {data.map((ticket) => (
                    <Ticket key={ticket.id} id={ticket.id} user={ticket.user} message={ticket.message} status={ticket.status} />
                ))}
              </div>
            </React.Fragment>
          )}
        </div>
      </section>
    );
  }
  

export default Selection2;