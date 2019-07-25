import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, } from 'mdbreact';
import '../pageStyle.css'
import target from '../../image/target.jpg'


class Challenge extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    };
  }



  render() {

    let style = {
        width:"70%"
      }

      return(
        <MDBContainer className="mt-5 pt-5 mainContainer text-dark">
            <div className="align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>Challenge : Run every day for atleast 10 minutes</h3>
                <h6>Started on: 2019-05-02</h6>
                <div className="btn-toolbar mb-2 mb-md-0">
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    Description :
                </div>
                <div class="card-body">
                    <p> This is where you will put the description for the goal. </p>
                    <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={style}> </div>
                    </div>
                </div>
            </div>

            {/* /{{!-- report --}} */}
            <div class="card mb-3">
                <div class="card-header">
                    Report :
                </div>
                <div class="card-body">
                    <div class="card mb-3">
                    <div class="card-body">
                        <h6>Week: 1</h6>
                        <p>successfull</p>
                    </div>
                    </div>
                </div>
                <button type="button" class="btn btn-dark waves-effect waves-light" data-toggle="modal"
                    data-target="#centralModalSm">Add a Report</button>

            </div>

            {/* {{!-- comments --}} */}
                <div class="card mb-3">
                    <div class="card-header"> Comments : </div>
                    <div class="card-body">
                        <div class="list-group-item list-group-item-action flex-column align-items-start">
                            <p>WHAT!!!!</p>
                            <small> Added by : bob </small> <br></br>
                            <small> Created at : today </small>
                            <br></br>
                            <form id="commentForm">
                                <div class="form-group">
                                    <label for="comment">Comment : </label>
                                    <textarea class="form-control" rows="2" id="comment"></textarea>
                                    <button type="submit" class="btn btn-dark" id="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                

                <a href="/dashboard">Go back to dashboard</a>






        </MDBContainer>
      );
    }
};

export default Challenge