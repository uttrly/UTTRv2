import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput} from 'mdbreact';
import API from '../../utils/AdminAPI'
import '../pageStyle.css'
import axios from 'axios';
import Alert from '../../components/Alert'

class Admin extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoading: false,
        error: true,
        email: '',
        password: '',
        loggedIn: true,
        showError: true,
        showNullError: true,
        registerError: true,
        messageFromServer: '',
      };
    }

    populateRoute = (e) => {
      e.preventDefault()
      API.addAllRoutes()
        .then(res => {
          console.log("All routes Added.")
        })
    }


    // not true authentication
    // componentDidMount() {
    //   let accessString = localStorage.getItem('JWT')
    //   console.log(accessString)
    //   if (accessString === 'undefined') {
    //     this.setState({
    //       isLoading: false,
    //       error: true
    //     })
    //   } else {
    //     let payload = accessString.split(".")[1]

    //     console.log(payload)

    //     let decodedPayload = JSON.parse(base64.decode(payload))

    //     console.log(decodedPayload.email)
    //     console.log(this.props.match.params.email)

    //     if (decodedPayload.email === this.props.match.params.email) {
    //       console.log("decodedPayload.email === this.props.match.params.email")
    //       this.setState({
    //         error: false
    //       })
    //     }

    //   }
    // }


    componentDidMount() {
      let accessString = localStorage.getItem('JWT')
      console.log(accessString)
      if (accessString === 'undefined') {
        this.setState({
          isLoading: false,
          error: true
        })
      } else {

        axios.get("/api/auth/user", {
            headers: {
              Authorization: `JWT ${accessString}`
            }
          })
          .then((response) => {
            console.log(response.data)

            if (response.data.auth) {
              console.log(`auth is ${response.data.auth}`)
              console.log(this)
              this.setState({
                isLoading: false,
                error: false
              })
            }

          })
          .catch(error => console.error(error))
      }
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
          console.log(response.data)
          alert(response.data.message)
          this.setState({
            email: '',
            password: '',
            messageFromServer: response.data.message,
            showError: false,
            loginError: false,
            registerError: false,
          });
        } catch (error) {
          console.log(error);
          if (error.response.data === 'username or email already taken') {
            alert(error.response.data)
            this.setState({
              showError: true,
              loginError: true,
              registerError: false,
            });
          }
        }
      }
    };
  
    logout = () => {
      localStorage.removeItem('JWT');
      this.setState({
        error: true
      })
    }


  render() {
    let admin = 
    <div>
        < MDBBtn color = "yellow accent-3" className="black-text" onClick = {(e) => this.populateRoute(e) } > Add TTC Routes and Stops </MDBBtn>
        <hr style={{borderTop: "3px solid #ffffff"}} className="my-4"></hr>
        <MDBRow>
        <MDBCol md="12" className="mx-auto text-left">
          <form>
            <p className="h5 text-center white-text">Register New Admin</p>
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
      <hr style={{borderTop: "3px solid #ffffff"}} className="my-4"></hr>
      <MDBBtn color="yellow accent-3" className="black-text" onClick={(e) => this.logout(e)}>Log Out</MDBBtn>
    </div>

    return ( 
      <MDBContainer className = "text-center mt-5 pt-5 mainContainer" >
        <MDBRow className = "justify-content-center" >
          <MDBCol md = "5" sm = "12" > 
          {!this.state.error && admin}
          {this.state.error && < MDBBtn color = "yellow accent-3" className="black-text" href = "/signin" > Please login with the correct credentials.<br></br>Click here to return to the Sign In page.</ MDBBtn>}
          </MDBCol> 
        </MDBRow> 
      </MDBContainer>
    );
  };
};

export default Admin