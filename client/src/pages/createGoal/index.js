import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import API from "../../utils/API.js";
import '../pageStyle.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";


class CreateGoal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            goal: '',
            refereeEmail: '',
            // stake:""
        }
    }
    handleInputChange = name => (event) => {
        console.log(event.target.value);
        let value = event.target.value;

        this.setState({
            [name]: value,
        });
    }
    handleFormSubmit = event => {
        event.preventDefault()
        // event.preventDefault();
        const { user } = this.props.auth
        console.log(user);

        // let id = this.props.auth.id;
        console.log("this works ----");

        const userData = {
            goal: this.state.goal,
            refereeEmail: this.state.refereeEmail,
            stake: this.state.stake
        };

        console.log(userData);

        API.createGoal(userData)
            .then(function (data) {
                console.log("data ----- ", data);

            })
            .catch(err => { console.log(" ERROR ------ ", err) })
    }

    // uploadPhoto(event) {
    //     event.preventDefault()
    //     var photo = document.getElementById('stake').files[0]
    //     var fileName = uuidv4()
    //     var stakeStorage = defaultStorage.ref(fileName)
    //     stakeStorage.put(photo).then(function () {
    //         defaultStorage.ref().child(fileName).getDownloadURL().then(function (url) {
    //             submitButton(url)
    //         })
    //     })
    // }

    //random keygen for file name
    // uuidv4() {
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //         var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    //         return v.toString(16);
    //     });
    // }



    render() {

        const { user } = this.props.auth

        return (

            <MDBContainer className="mt-5 pt-5 mainContainer">
                <MDBRow>
                    < MDBCol lg="10" className="mx-auto">
                        <div class="card card-signin flex-row my-5">
                            <div class="card-body">
                                <h3 className="card-title text-center">Create a Challenge</h3>
                                <form id="goalForm" >
                                    <div>
                                        <h5><i>Please follow the given format when filling out your goal </i></h5>
                                        <p> My goal is to "title" for "duration" starting on "start date"</p>
                                        <p> Example : My goal is to run everyday for 10 weeks starting on october 18, 2020. </p>

                                    </div>

                                    <div class="form-group">
                                        <label>Goal : </label>
                                        <textarea onChange={this.handleInputChange("goal")} class="form-control" id="goal" Required placeholder="My goal is to run everyday for 10 weeks starting on october 18, 2020." Required></textarea>
                                    </div>

                                    <div class="form-group">
                                        <label for="refereeEmail">Referee Email Address :</label>
                                        <input onChange={this.handleInputChange("refereeEmail")} type="email" class="form-control" id="refEmail" aria-describedby="emailHelp" placeholder="Enter Referee Email" Required />
                                    </div>
                                    <div class="form-group">
                                        <label for="stake">Stake :</label>
                                        <input onChange={this.handleInputChange("stake")} type="file" accept="image/*" class="form-control" id="stake" Required />
                                    </div>

                                    <button type="submit" onClick={this.handleFormSubmit} class="btn btn-dark">Submit</button>
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
