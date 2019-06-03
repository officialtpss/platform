import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';

class NavigationLoggedOut extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const {page} = this.props;
    return (
      <div style={{ backgroundColor: '#2b3f5c' }}>
        <Navbar dark expand className="login-header">
          <NavbarToggler right="true" onClick={this.toggle} />
          <Link to="/" className="navbar-brand">
            <img src="/img/new_logo.svg" alt="Populous" height={66} />
          </Link>
          <Collapse isOpen={this.state.isOpen} navbar>
            { page=='registration' &&
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <span className="nav-link">
                    ALREADY A MEMBER?
                  </span>
                </NavItem>
                <NavItem>
                  <Link to="/login" className="nav-link">
                    LOG IN
                  </Link>
                </NavItem>
              </Nav>
            }
            { page=='login' &&
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <span className="nav-link">
                    NEW HERE?
                  </span>
                </NavItem>
                <NavItem>
                  <Link to="/registration" className="nav-link">
                    SIGN UP
                  </Link>
                </NavItem>
              </Nav>
            }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default connect()(NavigationLoggedOut);
