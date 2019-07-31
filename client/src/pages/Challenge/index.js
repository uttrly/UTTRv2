import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn,MDBModal,MDBModalHeader,MDBModalBody,MDBModalFooter } from 'mdbreact';
import '../pageStyle.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import API from "../../utils/API";


class Challenge extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        modal: false,
        comment: [],
        report: [],
        goal: {}
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    
    let goalID = this.props.match.params.id
    const {user} = this.props.auth
      this.goal(user.id,user.email,goalID)
  }

  goal = (id,email,goalID) => {
    // console.log(header)
    API.getGoalInfo(id,email,goalID)
        .then(res => {

            
            let {data} = res
            console.log(data)
            this.setState({
                comment : data.comment,
                goal: data.goal,
                report: data.report
            })
        }
        )
        .catch(err => console.log(err));
  };



  render() {

    let style = {
        width:"70%"
      }

    const {user} = this.props.auth 
    let {comment,goal,report} = this.state
console.log(this.state)
      return(

        <MDBContainer className="mt-5 pt-5 mainContainer text-dark">
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
          <MDBModalBody>
            (...)
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
            <MDBBtn color="primary">Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>


            <div className="align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>Challenge : {goal.goalName}</h3>
                <h6>Started on: {goal.startDate}</h6>
                <div className="btn-toolbar mb-2 mb-md-0">
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    Description :
                </div>
                <div class="card-body">
                    <p> {goal.description}}</p>
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
                    data-target="#centralModalSm" onClick={this.toggle}>Add a Report</button>

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

Challenge.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps
)(Challenge);
