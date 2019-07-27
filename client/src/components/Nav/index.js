import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBCollapse, MDBNavItem, MDBDropdownItem, MDBNavLink, MDBIcon } from 'mdbreact';

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

  render() {
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
                {this.props.isLoggedIn && (
                  <MDBNavItem className={window.location.pathname === "/team" && "active"} onClick={this.toggleActive}>
                    <MDBNavLink to="/dashboard" >Goals</MDBNavLink>
                  </MDBNavItem>
                )}
              </MDBNavbarNav>
              <MDBNavbarNav right>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">
                    <MDBIcon icon="user-circle" style={{fontSize:"1.5rem"}} />
                    {this.props.isLoggedIn && ` ${this.props.email}`}
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right>
                    {this.props.isLoggedIn? (
                    <MDBDropdownItem href="/logout">Sign Out</MDBDropdownItem>
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

export default FixedNavbar;