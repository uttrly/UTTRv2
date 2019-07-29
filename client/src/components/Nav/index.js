import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBCollapse, MDBNavItem, MDBDropdownItem, MDBNavLink, MDBIcon } from 'mdbreact';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class FixedNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  toggleActive = (e) => {
    this.forceUpdate()
  }

  onSignoutClick = (e) => {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const {isAuthenticated, user} = this.props.auth

    return (
      <div>
        <header>
          <MDBNavbar style={{ backgroundColor: "#212121" }} dark expand="md" scrolling fixed="top">
            <MDBNavbarBrand href="/">
              <strong>UTTR</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem className={window.location.pathname === "/" && "active"} onClick={this.toggleActive}>
                  <MDBNavLink to="/" >Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem className={window.location.pathname === "/about" && "active"} onClick={this.toggleActive}>
                  <MDBNavLink to="/about" >About</MDBNavLink>
                </MDBNavItem>                                
                <MDBNavItem className={window.location.pathname === "/team" && "active"} onClick={this.toggleActive}>
                  <MDBNavLink to="/team" >Team</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">
                    <MDBIcon icon="user-circle" style={{fontSize:"1.5rem"}} />
                    {isAuthenticated && ` ${user.email}`}
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right>
                    {isAuthenticated? (
                    <div>
                      <MDBDropdownItem href="/dashboard">My Goals</MDBDropdownItem>
                      <MDBDropdownItem href="/createGoal">New Goal</MDBDropdownItem>
                      <MDBDropdownItem href="/logout" onClick={this.onSignoutClick}>Sign Out</MDBDropdownItem>
                    </div>    
                    ) : (
                    <div>
                      <MDBDropdownItem href="/signup">Sign Up</MDBDropdownItem>
                      <MDBDropdownItem href="/signin">Sign In</MDBDropdownItem>
                    </div>  
                    )}
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </header>
      </div>
    );
  }
}

FixedNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(FixedNavbar);