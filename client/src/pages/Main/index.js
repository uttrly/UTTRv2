import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, } from 'mdbreact';
import '../pageStyle.css'


class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    };
  }

  render() {
      return(
        <MDBContainer className="text-center mt-5 pt-5 mainContainer">
        main page
        </MDBContainer>
      );
    }
};

export default Main