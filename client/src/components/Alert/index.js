import React from "react";
import { MDBAlert } from 'mdbreact';
import "./style.css"

const AlertPage = (props) => {
  return (
      <MDBAlert color="dark" className="displayBox">
        <div className="d-flex flex-row">
            <div className="flex-grow-1">
                Just saved: <a href={props.link} target="_blank" rel="noopener noreferrer" className="alert-link"><strong>{props.title}</strong></a>.
            </div>
            <div onClick={(e) => {props.dismiss(e)}}>
                <i class="fas fa-times"></i>
            </div>
        </div>
      </MDBAlert>
  );
};

export default AlertPage;
