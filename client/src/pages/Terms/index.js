import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, } from 'mdbreact';
import '../pageStyle.css';

class Terms extends React.Component {

  render() {
    return(
      <MDBContainer className="my-5 pt-5 mainContainer">
        <h3>UTTR Terms and Conditions</h3>
        <p className="text-muted">LAST UPDATE OF THIS DOCUMENT - [2019-05-13]</p>
        <br/>
        <h4>1) Launching your own UTTR site</h4>
        <p>Sharon Chien, Sarah Sakhri, and Phuoc Phan built the <strong>UTTR (Up To The Right)</strong> web application as an Open Source app for the Coding Booot Camp of the University of Toronto's School of Continue Education. The codes are hosted on GitHub and is under a MIT license. You can currently launch your own UTTR service at no cost and must be launchd as it is. Credits must be given to Sharon Chien, Sarah Sakhri, and Phuoc Phan.</p>
        <h4>2) UTTR Membership</h4>
        <p>Currently, anyone who claims to be age 18 and above can become a member of UTTR. The website is provided by UTTR at no cost and is intended for use as is. For a better experience, while using UTTR website, UTTR may require you to provide personal information.</p>
        <h4>3) Collection, use, disclosure of personal email information</h4>
        <p> UTTR currently collects your personal email when you sign up to become a member. We aso collect the email of your referee when you create a goal. We will contact your referee via the provided email to inform them that they are now the referee of your goal. Should they not already be a member they will be invited to create an account. These emails are stored in a database. We use a third party service to send and receive emails. We do not sell any member or pending member email to any third party vender.</p>
        <h4>4) Collection, use, disclosure of stake photo</h4>
        <p>As part of goal creation, you need to submit a photo. This photo would be released to your referee should you not be able to achieve 80% of your goal.The release is done via email using a third party service. We are not responsible for the photo and its use and disclosure once in the hands of your referee. We also use a third party service to store your photo.</p>
        <h4>5) Thrid party service providers</h4>
        <p>UTTR may employ third-party companies and individuals due to the following reasons:</p>
        <ul>
          <li>To facilitate our Service</li>
          <li>To provide the Service on our behalf</li>
          <li>To perform Service-related services, or</li>
          <li>To assist us in analyzing how our Service is used</li>
        </ul>
        <p>These third parties may have access to your Personal Information (ie. email, photo). The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</p>
        <h4>6) Security</h4>
        <p>UTTR value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.</p>
        <h4>7) Terminatin of membership</h4>
        <p>In the current version of UTTR there is no way for a member to close their UTTR account. This will be addressed in futre versions of UTTR. UTTR reserves the right to close any member's account should they:</p>
        <ul>
          <li>be discoverd to be under the age of 18</li>
          <li>be in any way hostile to other members</li>
          <li>upload inappropriate photos</li>
          <li>compromise security and privacy of this website</li>
        </ul>
        <p>If you are a parent or guardian and you are aware that your child (under 18) has provided us with personal information, please contact us so that UTTR will be able to take necessary actions.</p>
        <br/>
        <h3>CHANGES TO THESE TERMS AND CONDITIONS</h3>
        <p>UTTR reserves the right to update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.</p>
      </MDBContainer>
    );
  };
};

export default Terms