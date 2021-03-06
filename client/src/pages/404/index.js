import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, } from 'mdbreact';
import '../pageStyle.css';

class Err extends React.Component {

  render() {
    return(
      <MDBContainer className="text-center mt-5 pt-5 mainContainer">
          <MDBRow className="justify-content-center">
              <MDBCol md="5" sm="12">
                <MDBBtn color="yellow accent-3" className="black-text" href="/">It is unfortunate that you ended up here.<br />Click to return to main menu.</MDBBtn>
              </MDBCol>
          </MDBRow>
      </MDBContainer>
    );
  };
};

export default Err