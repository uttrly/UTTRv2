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
            owner: 1,
            quote: {}

        };
    }
    componentDidMount() {
        const { user } = this.props.auth
        this.dashboard(user.id, user.email, "");
        this.quoteOfDay();

    }

    quoteOfDay() {
        API.quote()
            .then(res => this.setState({ quote: res.data }, console.log(res.data)))
            .catch(err => console.log(err));
    };


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

                    <MDBCol lg="8" md="6">
                        <div className="" style={{cursor: 'default'}}>
                            <div className="col-sm-12 text-center">
                                <div><b>QUOTE OF THE DAY</b></div>
                                <h6>"{this.state.quote.content}"</h6>
                                <p> - {this.state.quote.author}</p>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h2 className="h2">My Goals</h2>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2" >
                            <button onClick={this.handleClick} className="btn btn-sm btn-outline" id="" ><i className="fas fa-th-list"></i> My Goals </button>
                            <button onClick={this.handleClick} className="btn btn-sm btn-outline" id="referee"><i className="far fa-eye"></i> Referee</button>
                        </div>
                        <div className="btn-group mr-2">
                            <MDBBtn onClick={this.handleClick} small outline color="yellow accent-3" id="createGoal"><i className="far fa-plus-square"></i> Add New Goal</MDBBtn>
                        </div>
                    </div>
                </div>
                <MDBRow>
                    {this.state.owner === 1 ? (
                        <MDBCol md="2">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link active" id="" href="#" onClick={this.handleClick}>
                                        <i className="fas fa-chart-line"></i>{' '}
                                        Active <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="complete" href="#" onClick={this.handleClick}>
                                        <i className="far fa-check-square"></i> Complete
                    </a>
                                </li>
                            </ul>
                        </MDBCol>

                    ) : ""
                    }
                    <MDBCol md="10">
                        {this.state.goal.map(item =>
                            <div className="list-group scrollable" key={item.id}>
                                <a href={"/challenge/" + item.id} className="list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1 indigo-text">{item.name}</h5>
                                        <small className="cyan-text">{item.duration}</small>
                                    </div>
                                    <p className="mb-1">{item.description}</p>
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