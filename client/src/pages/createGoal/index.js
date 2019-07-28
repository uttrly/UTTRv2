import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../pageStyle.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";


class CreateGoal extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
    
        const {user} = this.props.auth 
        
        return (

            <MDBContainer className="mt-5 pt-5 mainContainer">
                <MDBRow>
                    < MDBCol lg="10" className="mx-auto">
                        <div class="card card-signin flex-row my-5">
                            <div class="card-body">
                                <h3 class="card-title text-center">Create a Challenge</h3>
                                <form id="goalForm" >
                                    <div class="form-group">
                                        <label>Title : </label>
                                        <input type="name" class="form-control" id="title" aria-describedby="goalTitle" placeholder="Enter Title" Required />
                                    </div>
                                    <div class="form-group">
                                        <label>Description : </label>
                                        <textarea class="form-control" id="description" Required></textarea>
                                    </div>
                                    <fieldset class="form-group">
                                        <div class="row">
                                            <legend class="col-form-label col-md-3 pt-0">Commitment Type : </legend>
                                            <div class="form-check col-md-2">
                                                <input class="form-check-input" type="radio" name="goalType" id="onGoing" value="false" checked />
                                                <label class="form-check-label">On Going</label>
                                            </div>
                                            <div class="form-check col-md-2">
                                                <input class="form-check-input" type="radio" name="goalType" id="oneShot" value="true" />
                                                <label class="form-check-label">One Shot</label>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div class="form-group">
                                        <label for="inputStartDate">Start Date :</label>
                                        <input class="form-control" type="date" id="startDate" Required />
                                    </div>

                                    <div class="form-group" id="durationField" >
                                        <label for="duration">Duration :</label>
                                        <input class="form-control" type="number" placeholder="(in weeks)" id="duration" value="0" />
                                    </div>

                                    <div class="form-group">
                                        <label for="refereeEmail">Referee Email Address :</label>
                                        <input type="email" class="form-control" id="refEmail" aria-describedby="emailHelp" placeholder="Enter Referee Email" Required />
                                    </div>
                                    <div class="form-group">
                                        <label for="stake">Stake :</label>
                                        <input type="file" accept="image/*" class="form-control" id="stake" Required />
                                    </div>

                                    <button type="submit" class="btn btn-dark">Submit</button>
                                </form>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );
    };
}


CreateGoal.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps
  )(CreateGoal);
  