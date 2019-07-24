import React from "react";
import { MDBContainer,  MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="elegant-color-dark" className="font-small mt-4">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: Sharon Chien, Phuoc Phan and Sarah Sakhri
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;