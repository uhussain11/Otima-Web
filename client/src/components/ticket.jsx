import './ticket.css'

function Ticket({id, message, status}){

    return(
        <div className="card">
            <dl className="header">
                <h2>ID: {id}</h2>
                <p className={status}>{status}</p>
            </dl>
            <p className="message">{message}</p>
        </div>
    )

}

export default Ticket;