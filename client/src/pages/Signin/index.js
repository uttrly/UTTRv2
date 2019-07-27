import React from "react";
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios';

class Signin extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      showError: false,
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = async (e) => {
    e.preventDefault();
    const {
      email,
      password
    } = this.state;
    if (email === '' || password === '') {
      this.setState({
        showError: false,
        showNullError: true,
        loggedIn: false,
      });
    } else {
      try {
        const response = await axios.post('/api/auth/signin', {
          email,
          password,
        });
        console.log(response.data)
        localStorage.setItem('JWT', response.data.token);
        this.setState({
          loggedIn: true,
          showError: false,
          showNullError: false,
        });
      } catch (error) {
        console.error(error.response.data);
        if (
          error.response.data === 'bad username' ||
          error.response.data === 'passwords do not match'
        ) {
          this.setState({
            showError: true,
            showNullError: false,
          });
        }
      }
    }
  };


  render(){
    if(!this.state.loggedIn) {
      return (
        <MDBContainer className="mt-5 pt-5 mainContainer">
          <MDBRow>
            <MDBCol md="6" className="mx-auto">
              <form>
                <p className="h5 text-center mb-4">Sign In</p>
                <div className="">
                  <MDBInput
                    className=""
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                  />
                  <MDBInput
                    className=""
                    label="Type your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                  />
                </div>
                {this.state.showNullError && (
                  <div>
                    <p className="text-center">The username or password cannot be empty.</p>
                  </div>
                )}
                {this.state.showError && (
                  <div>
                    <p className="text-center">
                    That username or password isn&apos;t recognized. Please try again or register now. 
                    </p>
                    <MDBBtn href="/signup" size="sm" color="yellow accent-3" className="black-text">Register</MDBBtn>
                  </div>

                )}
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
    return <Redirect to={`/dashboard`} />
  }
};

export default Signin;