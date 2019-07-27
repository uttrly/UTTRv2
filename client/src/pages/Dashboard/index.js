import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, } from 'mdbreact';
import '../pageStyle.css'
import target from '../../image/target.jpg'
import API from "../../utils/API";


import axios from 'axios'

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        goal: {},
        isLoggedIn: false
    };
  }

  componentDidMount() {
    // this.dashboard("");
    let accessString = localStorage.getItem('JWT')
    console.log("testing_____")
    console.log(accessString)
    if (accessString === 'undefined' | accessString === null) {
      this.setState({
        isLoading: false,
        error: true
      })

      this.props.history.push("/signin");

    } else {

this.dashboard("",accessString)

      // axios.get("/api/auth/user", {
      //     headers: {
      //       Authorization: `JWT ${accessString}`
      //     }
      //   })
      //   .then((response) => {
      //     console.log(response.data)

      //     if (response.data.auth) {
      //       console.log(`auth is ${response.data.auth}`)
      //       console.log(this)
      //       this.setState({
      //         isLoggedIn: true
      //       })
      //     }

      //   })
      //   .catch(error => console.error(error))
    }
  }  


dashboard = (status,header) => {
  console.log(header)
  API.dashboard(status, {
    headers: {
      Authorization: `JWT ${header}`
    }
  })
      .then(res =>
          //   this.setState({
          //     image: res.data.message
          //   })
          console.log(res)
      )
      .catch(err => console.log(err));
};


  render() {

    let style = {
        cursor:"pointer"
      }

      return(
        <MDBContainer className="mt-5 pt-5 mainContainer text-dark">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h1">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                </div>
            </div>

            <h2 className="h2">UTTR Points</h2>

            <MDBRow>
                <MDBCol lg="4" md="6">
                    <div className="account-points-update panel panel-primary mouseover-animated-pulse click-animated-jello" style={style}>
                    <div className="panel-heading">
                        <div className="row">
                        <div className="col-sm-3"><i className="fas fa-bolt fa-5x"></i></div>
                        <div className="col-sm-9 text-right">
                            <div className="account-points-earned huge text-right">PlaceHOLDER</div>
                            <div>Earned Points!</div>
                            <h6>Click to enter to win a car</h6>
                        </div>
                        
                        </div>
                    </div>
                    </div>
                </MDBCol>
            </MDBRow>


            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2 class="h2">My Goals</h2>
                <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group mr-2">
                    <MDBBtn class="btn btn-sm btn-outline" onclick="location.href='/dashboard';"><i class="fas fa-th-list"></i>My Goals</MDBBtn>
                    <MDBBtn class="btn btn-sm btn-outline" onclick="location.href='/dashboard/referee';"><i class="far fa-eye"></i>Referee</MDBBtn>
                </div>

                <div class="btn-group mr-2">
                    <MDBBtn class="btn btn-sm btn-outline" onclick="location.href='/createGoal';"><i class="far fa-plus-square"></i> Add New Goal</MDBBtn>
                </div>
                </div>
            </div>


            <MDBRow>
                <MDBCol md="2">
                <ul class="nav flex-column">
                    <li class="nav-item">
                    <a class="nav-link active" href="/dashboard">
                        <i class="fas fa-chart-line"></i>
                        Active <span class="sr-only">(current)</span>
                    </a>
                    </li>
                    <li class="nav-item">

                    <a class="nav-link" href="/dashboard/complete">

                        <i class="far fa-check-square"></i> Complete
                    </a>
                    </li>
                </ul>
                </MDBCol>
                <MDBCol md="10">

                <div class="list-group scrollable">

                    <a href="/challenge/{{id}}" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1 indigo-text">Place holder for title</h5>
                        <small class="cyan-text">1/10</small>
                    </div>
                    <p class="mb-1">here is where you put the description for each tasks</p>
                    <small>Created: Today Date</small>
                    </a>


                </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
      );
    }
};

export default Dashboard