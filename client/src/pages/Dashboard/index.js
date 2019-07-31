import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, } from 'mdbreact';
import '../pageStyle.css';
import API from "../../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            goal: [],
            point: 0,
            owner: 1
        };
    }
    componentDidMount() {
        const { user } = this.props.auth
        this.dashboard(user.id, user.email, "")
    }


    dashboard = (id, email, status) => {
        // console.log(header)
        API.dashboard(id, email, status)
            .then(res => {
                let { data } = res

                if (data.points !== null && data.points !== "null" && data.points !== undefined) {
                    this.setState({
                        point: data.points
                    })
                    // console.log(res.points)
                }
                console.log(data)
                this.setState({
                    goal: data.goals
                })
                console.log(res)
            }
            )
            .catch(err => console.log(err));
    };
    handleClick = (e) => {
        const { user } = this.props.auth
        e.preventDefault();
        console.log(e.target.id);
        let status = e.target.id;

        if (status === "createGoal") {
            this.props.history.push("/createGoal")
        } else {
            this.dashboard(user.id, user.email, status)
        }
    }
    render() {
        let style = {
            cursor: "pointer"
        }
        const { user } = this.props.auth
        // this is the user object that can be used for interacting w/ db
        // example of user object:
        // user: {
        //   id: 1,
        //   email: 'sharon@gmail.com'
        // } 
        console.log(this.state.goal)
        return (
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
                                        <div className="account-points-earned huge text-right">{this.state.point}</div>
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
                        <div class="btn-group mr-2" >
                            <button onClick={this.handleClick} class="btn btn-sm btn-outline" id="" ><i class="fas fa-th-list"></i>My Goals </button>
                            <button onClick={this.handleClick} class="btn btn-sm btn-outline" id="referee"><i class="far fa-eye"></i>Referee</button>
                        </div>
                        <div class="btn-group mr-2">
                            <MDBBtn onClick={this.handleClick} class="btn btn-sm btn-outline" id="createGoal"><i class="far fa-plus-square"></i> Add New Goal</MDBBtn>
                        </div>
                    </div>
                </div>
                <MDBRow>
                    {this.state.owner === 1 ? (
                        <MDBCol md="2">
                            <ul class="nav flex-column">
                                <li class="nav-item">
                                    <a class="nav-link active" id="" href="#" onClick={this.handleClick}>
                                        <i class="fas fa-chart-line"></i>
                                        Active <span class="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="complete" href="#" onClick={this.handleClick}>
                                        <i class="far fa-check-square"></i> Complete
                    </a>
                                </li>
                            </ul>
                        </MDBCol>

                    ) : ""
                    }
                    <MDBCol md="10">
                        {this.state.goal.map(item =>
                            <div class="list-group scrollable" key={item.id}>
                                <a href={"/challenge/" + item.id} class="list-group-item list-group-item-action flex-column align-items-start">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1 indigo-text">{item.name}</h5>
                                        <small class="cyan-text">{item.duration}</small>
                                    </div>
                                    <p class="mb-1">{item.description}</p>
                                    <small>Created: {item.createDate}</small>
                                </a>
                            </div>
                        )}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
};
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps
)(Dashboard);