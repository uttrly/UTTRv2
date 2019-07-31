import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from "mdbreact";
import API from "../../utils/API.js";
import '../pageStyle.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { storage } from '../../firebase';
import Validator from 'validator'
import isEmpty from 'is-empty'
import classnames from "classnames";

class CreateGoal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            goal: '',
            refereeEmail: '',
            stake: '',
            errors: {},
            done: false
        }


    }
    handleInputChange = name => (event) => {
        console.log(event.target.value);
        this.setState({
            [name]: event.target.value,
        });
    }

    handleFormSubmit = event => {
        event.preventDefault()
        // event.preventDefault();
        const { user } = this.props.auth

        const userData = {
            userId: user.id,
            goal: this.state.goal,
            refereeEmail: this.state.refereeEmail,
            stake: this.state.stake
        };

        console.log(userData);
        let validation = this.validation(userData)

        console.log(validation)

        if (!validation.isValid) {
            this.setState({ errors: validation.errors })
        }

        API.createGoal(userData)
            .then((res) => {
                console.log(res.data.message);
                if (res.data.message === 'Goal sucessfully created.') {
                    this.setState({ done: true })
                }

            })
            .catch(err => { console.log(" ERROR ------ ", err) })
    }

    uploadPhoto = (event) => {
        event.preventDefault()
        var photo = event.target.files[0]
        var fileName = this.uuidv4()
        var stakeStorage = storage.ref(fileName)
        console.log('done')
        stakeStorage.put(photo).then(() => {
            storage.ref().child(fileName).getDownloadURL().then(url => {
                this.setState({ stake: url })
            })
        })
    }

    //random keygen for file name
    uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    validation = (data) => {
        let errors = {};
        // Convert empty fields to an empty string so we can use validator functions
        data.goal = !isEmpty(data.goal) ? data.goal : "";
        data.refereeEmail = !isEmpty(data.refereeEmail) ? data.refereeEmail : "";
        data.stake = !isEmpty(data.stake) ? data.stake : "";

        if (Validator.isEmpty(data.refereeEmail)) {
            errors.refereeEmail = "Referee email is required";
        } else if (!Validator.isEmail(data.refereeEmail)) {
            errors.refereeEmail = "Email is invalid";
        }

        if (Validator.isEmpty(data.goal)) {
            errors.goal = "Goal is required";
        }

        if (Validator.isEmpty(data.stake)) {
            errors.stake = "Stake photo is required";
        }

        return {
            errors,
            isValid: isEmpty(errors)
        };

    }


    render() {

        if (this.state.done) {
            return <Redirect to='/dashboard' />
        }
        const { errors } = this.state

        return (

            <MDBContainer className="my-5 pt-5 mainContainer">
                <MDBRow>
                    < MDBCol lg="10" className="mx-auto">
                        <MDBCard>
                            <MDBCardBody>
                                <h3 className="card-title text-center">Create a Challenge</h3>
                                <br></br>
                                <h5><i>Please follow the given format when filling out your goal.</i></h5>
                                <p> "Goal" for "duration" weeks starting "start date".</p>
                                <p> Example : Run everyday for 10 weeks starting October 18, 2019. </p>
                                <form className="needs-validation" noValidate >
                                    <MDBInput
                                        className={classnames("", { invalid: errors.goal })}
                                        group
                                        icon="clipboard"
                                        type="text"
                                        label="Your Goal"
                                        onChange={this.handleInputChange("goal")}
                                        id="goal"
                                        required
                                        value={this.state.goal}
                                    />
                                    <small className="form-text red-text">{errors.goal}</small>
                                    <MDBInput
                                        className={classnames("", { invalid: errors.refereeEmail })}
                                        group
                                        icon="envelope"
                                        type="text"
                                        label="Referee's Email"
                                        onChange={this.handleInputChange("refereeEmail")}
                                        id="referee"
                                        required
                                        value={this.state.refereeEmail}
                                    />
                                    <small className="form-text red-text">{errors.refereeEmail}</small>
                                    <br />
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupFileAddon01">
                                                Upload Stake
                                            </span>
                                        </div>
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                id="inputGroupFile01"
                                                aria-describedby="inputGroupFileAddon01"
                                                accept="image/*"
                                                onChange={(event) => this.uploadPhoto(event)}
                                            />
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                no file chosen
                                            </label>
                                        </div>
                                    </div>
                                    <small className="form-text red-text">{errors.stake}</small>
                                    <br />
                                    <MDBBtn color="yellow accent-3" type="submit" onClick={this.handleFormSubmit} className="black-text">Submit</MDBBtn>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
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
