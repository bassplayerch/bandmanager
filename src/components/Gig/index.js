import React from "react";
import './Gig.css';

const gig = props => {
    return (
            <tr className="gig">
                <td>{props.date}</td>
                <td>{props.time}</td>
                <td>{props.location}</td>
                <td>{props.comments}</td>
                <td><span onClick={props.editClickHandler} className="changeIcon">edit</span></td>
                <td><span onClick={props.clickHandler} className="deleteIcon">x</span></td>
          

            </tr>
    )
}

export default gig;
