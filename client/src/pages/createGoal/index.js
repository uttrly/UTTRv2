import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";


class CreateGoal extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (

            <MDBContainer className="mt-5 pt-5 mainContainer">
                <MDBRow>
                    < MDBCol lg="10" className="mx-auto">
                        <div class="card card-signin flex-row my-5">
                            <div class="card-body">
                                <h3 class="card-title text-center">Create a Challenge</h3>
                                <form id="goalForm" >
                                    <div>
                                        <h5><i>Please follow the given format when filling out your goal </i></h5>
                                        <p> My goal is to "title" for "duration" starting on "start date"</p>
                                        <p> Example : My goal is to run everyday for 10 weeks starting on october 18, 2020. </p>

                                    </div>

                                    <div class="form-group">
                                        <label>Goal : </label>
                                        <textarea class="form-control" id="description" Required placeholder="My goal is to run everyday for 10 weeks starting on october 18, 2020."></textarea>
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


export default CreateGoal;