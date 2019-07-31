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
        goal: {},
        progressperc: 0,
        success:"",
        value: ""
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log(goalID)
    API.getGoalInfo(id,email,goalID)
        .then(res => {

            
            let {data} = res
            console.log(data)
            this.setState({
                comment : data.comment,
                goal: data.goal,
                report: data.report,
                progressperc: data.progressperc
            })
        }
        )
        .catch(err => console.log(err));
  };

  handleChange = name => (event) => {
    console.log(event.target.value);
    this.setState({
        [name]: event.target.value,
    });
  }  

  handleSubmit = (event) => {
    event.preventDefault();
    // alert('A name was submitted: ' + this.state.value);
    console.log(this.props.match.params.id)
    
    let goalID = this.props.match.params.id
    const {user} = this.props.auth
    this.submitComment(user.id,user.email,goalID,this.state.value)

    
  }

  submitComment = (id,email,goalID,comment) => {
    // console.log(header)
    API.submitComment(id,email,goalID,comment)
        .then(res => {

            
            if(res.data.text === this.state.value){
              this.setState({value: ''})
              let goalID = this.props.match.params.id
              const {user} = this.props.auth
              this.goal(user.id,user.email,goalID)
            }
            // this.setState({
            //     comment : data.comment,
            //     goal: data.goal,
            //     report: data.report,
            //     progressperc: data.progressperc
            // })
        }
        )
        .catch(err => console.log(err));
  };

  handleChange(event) {
    this.setState({
      success: event.target.value
    });

  }

  report = (event) => {
    console.log(this.state.success)
    event.preventDefault();
    // alert('A name was submitted: ' + this.state.value);
    console.log(this.state.success)
    
    let goalID = this.props.match.params.id
    const {user} = this.props.auth
    this.submitReport(user.id,user.email,goalID,this.state.success)
  }

  submitReport = (id,email,goalID,success) => {
    // console.log(header)
    API.submitReport(id,email,goalID,success)
        .then(res => {
        // console.log(res)
        this.toggle()
            
        }
        )
        .catch(err => console.log(err));
  };



  render() {

    let style = {
        width:this.state.progressperc + "%"
      }

    const {user} = this.props.auth 
    let {comment,goal,report} = this.state
    console.log(this.state)
      return(

        <MDBContainer className="mt-5 pt-5 mainContainer text-dark">
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>Report</MDBModalHeader>
          <MDBModalBody>
            <div className="custom-control custom-radio">
                <input type="radio" className="custom-control-input" id="defaultGroupExample1"   onChange={this.handleChange('success')} value="1" name="success" checked={this.state.success==='1'}/>
                <label className="custom-control-label" htmlFor="defaultGroupExample1">Successfull</label>
            </div>

            <div className="custom-control custom-radio">
                <input type="radio" className="custom-control-input" id="defaultGroupExample2" onChange={this.handleChange('success')} value="0" name="success" checked={this.state.success==='0'}/>
                <label className="custom-control-label" htmlFor="defaultGroupExample2">Not Successfull</label>
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
            <MDBBtn color="primary" onClick={this.report}>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>


            <div className="align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>Challenge : {goal.goalName}</h3>
                <h6>Started on: {goal.startDate}</h6>
                <div className="btn-toolbar mb-2 mb-md-0">
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-header">
                    Description :
                </div>
                <div className="card-body">
                    <p> {goal.description}</p>
                    <div className="progress">
                    <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={style}> </div>
                    </div>
                </div>
            </div>

            {/* /{{!-- report --}} */}
            <div className="card mb-3">
                <div className="card-header">
                    Report :
                </div>
                {report.map(item => 
                    <div className="card-body">
                        <div className="card">
                            <div className="card-body">
                                <h6>Week: {item.week}</h6>
                                <p>{item.successfull ? "Successful" : "Unsuccessful"}</p>
                            </div>
                        </div>
                    </div>
                )}

                {goal.refereeEmail === user.email ? (
                <button type="button" className="btn btn-dark waves-effect waves-light" data-toggle="modal"
                    data-target="#centralModalSm" onClick={this.toggle}>Add a Report</button>
                ) : (
                    ""
                )}

            </div>

            {/* {{!-- comments --}} */}
                <div className="card mb-3">
                    <div className="card-header"> Comments : </div>
                    <div className="card-body">
                        <div className="list-group-item list-group-item-action flex-column align-items-start">

                            {comment.map(item =>
                            <>
                                <p className="mt-3">{item.text}</p>
                                <small> Added by : {item.username} </small> 
                                <br></br>
                                <small> Created at : {item.createdAt} </small>
                                </>
                            )}

                            <br></br>

                            <form id="commentForm" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="comment">Comment : </label>
                                    <textarea className="form-control" rows="2" id="comment" value={this.state.value} onChange={this.handleChange('value')}></textarea>
                                    <input type="submit" className="btn btn-warning black-text" value="Submit" />
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
