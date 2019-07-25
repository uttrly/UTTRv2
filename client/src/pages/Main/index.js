import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import '../pageStyle.css'
import target from '../../image/target.jpg'


class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  render() {
    return (
      <MDBContainer className="text-center mt-5 pt-5 mainContainer">
        <MDBRow className="align-items-center">
          <MDBCol size="md-4 sm-12" className="ml-auto">
            <h1>Be UTTR-ly Amazing</h1>
            <hr />
            <p>You want to be better? But your future self lets you down? We are here to help.</p>
            <br></br>
            <MDBBtn color="warning" href="/about">Learn More!</MDBBtn>
          </MDBCol>
          <MDBCol>
            <img src={target} alt="logo" className="logoImg"></img>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
};

export default Main