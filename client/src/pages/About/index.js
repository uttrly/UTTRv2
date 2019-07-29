import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, } from 'mdbreact';
import '../pageStyle.css';
import graph from '../../image/chart.png'

class About extends React.Component {

  render() {
    return(
      <MDBContainer className="mt-5 pt-5 mainContainer">
        <h1><img style={{maxHeight:"1.5rem"}} src={graph}/> UTTR</h1>
        <br/>
        <p>We believe the way to having a successful life is by always striving to be the best versions of ourselves. 
        This is why we stand behind the motto, UTTR (Up To The Right), which is meant to describe continuous positive growth.
        A community platform like UTTR promotes an increase in productivity and is a place where people help push and motivate each other in achieving their desired goals. 
        Users are able to display their challenges and detailed information about their progress. 
        They are required to assign a referee for each goal, to help them stay consistent with their goals. This easy to use website 
        is also a great way for goal-oriented people to continually expand their growth in their personal, social, and professional life.</p>
        <br/>
        <h3>How does it work?</h3>
        <p>It is a fairly simple process. First, you sign up (you will be required to confirm that you read our privacy policy). After signing in, 
        you will land on your dashboard where you can view your active and completed challenges or create a new challenge. 
        You will then need to fill out a form of the following : </p>
        <ul>
          <li>Your goal in the format of [goal] [number] of weeks starting [date]. </li>
          <li>Referee</li>
          <small className="gray-text">someone of yur choosing</small>
        </ul>  
      </MDBContainer>
    );
  };
};

export default About