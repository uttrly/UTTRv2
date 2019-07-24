import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdbreact';
import sharon from "../../image/sharon2.jpg"
import phuoc from "../../image/phuoc2.jpg"
import sarah from "../../image/sarah2.jpg"

const AboutPage = () => {
    return (
      <MDBContainer id="about" className="mt-5 pt-5 mainContainer text-dark">
          <h3 >UTTR is brought to you by:</h3>
          <br></br>
          <MDBRow>
              <MDBCol className="col-xl-3 col-md-6 col-sm-12 ml-auto mb-4">
                <MDBCard>
                    <MDBCardImage src={sharon} top></MDBCardImage>
                    <MDBCardBody className="text-center">
                        <MDBCardTitle>Sharon Chien</MDBCardTitle>
                        <MDBBtn color="warning" href="https://kinla.github.io/Me/" target="_blank">Portfolio</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol className="col-xl-3 col-md-6 col-sm-12 mb-4">
                <MDBCard>
                    <MDBCardImage src={phuoc} top></MDBCardImage>
                    <MDBCardBody className="text-center">
                        <MDBCardTitle>Phuoc Phan</MDBCardTitle>
                        <MDBBtn color="warning" href="https://pphan93.github.io/Updated-Portfolio/" target="_blank">Portfolio</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol className="col-xl-3 col-md-6 col-sm-12 mb-4 mr-auto">
                <MDBCard>
                    <MDBCardImage src={sarah} top></MDBCardImage>
                    <MDBCardBody className="text-center">
                        <MDBCardTitle>Sarah Sakhri</MDBCardTitle>
                        <MDBBtn color="warning" href="https://sarahsakhri.github.io/Updated-Portfolio/" target="_blank">Portfolio</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
              </MDBCol>                            
          </MDBRow> 

      </MDBContainer>
    );
  }
  
  export default AboutPage;
  