import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage } from 'mdbreact';
import image from "../../image/sharon"

const AboutPage = () => {
    return (
      <MDBContainer id="about" className="mt-5 pt-5 mainContainer text-dark">
          <h3>UTTR is brought to you by:</h3>
          <br></br>
          <MDBRow>
              <MDBCol className="col-xl-3 col-md-6 mb-4">
                <MDBCard>
                    <MDBCardImage src="../image/sharon2.jpg"></MDBCardImage>
                    <MDBCardBody>
                        <MDBCardTitle>Sharon Chien</MDBCardTitle>
                        <MDBCardText href="https://kinla.github.io/Me/">Portfolio</MDBCardText>
                    </MDBCardBody>
                </MDBCard>
              </MDBCol>
          </MDBRow>

      </MDBContainer>
    );
  }
  
  export default AboutPage;
  