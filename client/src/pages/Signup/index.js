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
      messageFromServer: '',
      showError: false,
      registerError: false,
      loginError: false,
      errors: {}
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }

    const newUser = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.registerUser(newUser, this.props.history)
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };


  registerUser = async (e) => {
    e.preventDefault();
    const {
      password,
      email
    } = this.state;

    if (password === '' || email === '') {
      this.setState({
        showError: true,
        loginError: false,
        registerError: true,
      });
    } else {
      try {
        console.log(`sending axios call`)
        const response = await axios.post(
          '/api/auth/signup', {
            email,
            password,
          },
        );
        // console.log(`${response}`)
        this.setState({
          messageFromServer: response.data.message,
          showError: false,
          loginError: false,
          registerError: false,
        });
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'username or email already taken') {
          this.setState({
            showError: true,
            loginError: true,
            registerError: false,
          });
        }
      }
    }
  };

  render () {
    const {errors} = this.state
    if(!this.state.messageFromServer){
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
                    error={errors.email}
                    success="right"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    id="emal"
                    required
                    />
                    <small className="form-text text-muted">{errors.email}</small>
                    {/* {this.state.email? <small className="form-text text-muted">We will never disclose your email.</small> : <small className="form-text text-muted">Please enter an email.</small>} */}
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
                  <small className="form-text text-muted">{errors.password}</small>
                  {/* {this.state.password? <small className="form-text text-muted">Don't forget your password.</small> : <small className="form-text text-muted">Please enter a password.</small>} */}
                  <div className="custom-control custom-checkbox pl-3">
                  <br/>
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    value=""
                    id="invalidCheck"
                    required
                  />
                  <label className="custom-control-label" htmlFor="invalidCheck">
                    Agree to <a href="/terms" target="_blank">terms and conditions</a>
                  </label>
                  <div className="invalid-feedback">
                    You must agree before submitting.
                  </div>
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
    return <Redirect to={"/signin"}/>
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
