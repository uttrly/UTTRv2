import React from "react";
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios'

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      messageFromServer: '',
      showError: false,
      registerError: false,
      loginError: false,
    };
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
        const response = await axios.post(
          '/api/auth/signup', {
            email,
            password,
          },
        );
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
    return (
      <MDBContainer className="mt-5 pt-5 mainContainer white-text">
        <MDBRow>
          <MDBCol md="6" className="mx-auto">
            <form>
              <p className="h5 text-center mb-4 white-text">Sign Up</p>
              <div className="white-text">
                <MDBInput
                  className="white-text"
                  label="Your Email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  id="emal"
                />
                <MDBInput
                  className="white-text"                
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                />
              </div>
              <div className="text-center">
                <MDBBtn color="yellow accent-3" className="black-text" onClick={(e) => this.registerUser(e)}>Register</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
};

export default Signup;


