import React from "react";
import { Redirect, withRouter } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBAlert } from 'mdbreact';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from 'axios'

class Signup extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      terms: false,
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }  
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onClick = () => {
        this.setState({
      terms: !this.state.terms
    })
  }


  registerUser = (e) => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password,
      terms: this.state.terms
    }
  
    this.props.registerUser(newUser, this.props.history)
  
  };

  render () {
    const {errors} = this.state

    return (
      <MDBContainer className="mt-5 pt-5 mainContainer">
        <MDBRow>
          <MDBCol md="6" className="mx-auto">
            <form className="needs-validation" noValidate>
              <p className="h5 text-center mb-4">Sign Up</p>
              <div>
                <MDBInput
                  className={classnames("", {invalid: errors.email})}
                  label="Your Email"
                  icon="envelope"
                  group
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  id="email"
                  required
                  />
                  <small className="form-text red-text">{errors.email}</small>
                <MDBInput
                  className={classnames("", {invalid: errors.password})}                
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  required
                />
                <small className="form-text red-text">{errors.password}</small>
                <div className="custom-control custom-checkbox pl-3">
                <br/>
                <input
                  className="custom-control-input"
                  type="checkbox"
                  value=""
                  id="termsAndConditions"
                  required
                  onClick={this.onClick}
                />
                <label className="custom-control-label" htmlFor="termsAndConditions">
                  Agree to <a href="/terms" target="_blank">terms and conditions</a>
                </label>
                <small className="form-text red-text">{errors.terms}</small>
                <br/><br/>
          </div>              
              </div>
              <div className="text-center">
                <MDBBtn color="yellow accent-3" className="black-text" onClick={(e) => this.registerUser(e)}>Sign Up</MDBBtn>
                <p className="font-small grey-text">{`Already a member? `}
                  <a href="/signin" style={{color:"#212121"}}>Sign in</a>
                </p>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
};

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Signup));
