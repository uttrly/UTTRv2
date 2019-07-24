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
              </MDBNavbarNav>
              <MDBNavbarNav right>

              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </header>
      </div>
    );
  }
}

export default FixedNavbar;