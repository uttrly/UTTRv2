import React from "react";
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Signin extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      showError: false,
      showNullError: false,
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
    }

  }


  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = async (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

  };


  render () {
    const { errors } = this.state

    return (
      <MDBContainer className="mt-5 pt-5 mainContainer">
        <MDBRow>
          <MDBCol md="6" className="mx-auto">
            <form>
              <p className="h5 text-center mb-4">Sign In</p>
              <div className="">
                <MDBInput
                  className={classnames("",{invalid: errors.email || errors.emailnotfound})}
                  label="Type your email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error={errors.email}
                  success="right"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange("email")}
                />
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>  
                <MDBInput
                  className={classnames("", {invalid: errors.password || errors.passwordincorrect})}
                  label="Type your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  id="password"
                  error={errors.password}
                  value={this.state.password}
                  onChange={this.handleChange("password")}
                />
                <span className="red-text">
                  {errors.password}
                  {errors.emailnotfoundpasswordincorrect}
                </span>                  
              </div>
              <div className="text-center">
                <MDBBtn color="yellow accent-3" className="black-text" onClick={(e)=>{this.loginUser(e)}}>Sign in</MDBBtn>
              </div>
              <p className="font-small grey-text text-center">{`Not a member? `}
                <a href="/signup" style={{color:"#212121"}}>Sign Up</a>
              </p>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
};

Signin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Signin);