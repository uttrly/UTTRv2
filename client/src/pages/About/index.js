import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, } from 'mdbreact';
import '../pageStyle.css';

class About extends React.Component {

  render() {
    return(
      <MDBContainer className="my-5 pt-5 mainContainer">
        <h1><i class="fas fa-chart-line"></i> UTTR</h1>
        <br/>
        <p>We believe the way to having a successful life is by always striving to be the best versions of ourselves. 
        This is why we stand behind the motto, UTTR (Up To The Right), which is meant to describe continuous positive growth.
        A community platform like UTTR promotes an increase in productivity and is a place where people help push and motivate each other in achieving their desired goals. 
        Users are able to display their goals and detailed information about their progress. 
        They are required to assign a referee for each goal, to help them stay consistent with their goals. This easy to use website 
        is also a great way for goal-oriented people to continually expand their growth in their personal, social, and professional life.</p>
        <p>Please read our <a href="/terms">Terms and Conditions</a> before registering.</p>
        <br/>
        <h3>How does it work?</h3>
        <p>It is a fairly simple process. First, you sign up (you will be required to confirm that you read our privacy policy). After signing in, 
        you will land on your dashboard where you can view your active and completed goals or create a new goal. 
        You will then need to fill out a form of the following : </p>
        <ul>
          <li>Your goal in the format of [goal] [number] of weeks starting [date]. </li>
          <li>Referee - Please provide the email of the person of your choosing.</li>
          <li>Stake - This is any photo that you would like to submit to be shard with your Referee via email should you fail 80% of your goal target.</li>
        </ul>  
        <p>Click on the goal to find more information specific to it and the progress you have made, reports that your referee has submitted , and a comment section for you and your referee to chat and provide updates. If you are assigned as a referee for someone's goal, you will be able to view their goals under "Referee" on your dashboard. </p>
        <p>For every week that you receive a successful report, you will earn 7 UTTR points. You will need to collect 10,000 points to enter our monthly draw to win a grand prize!</p> 
        <p class="text-center"><strong>You might be one of our lucky winners, so don't forget to complete your goals.</strong></p>
      </MDBContainer>
    );
  };
};

export default About