import React from "react";
import { MDBContainer,  MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="elegant-color-dark" className="font-small mt-4">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: Sharon Chien, Paul Xu, Quang Chieu Nguyen and Holland Gronau<br></br> 
          <a href="/signin">Powered by:</a><span> Google Maps Distance Matrix API &amp; NextBus</span>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;