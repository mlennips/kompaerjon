import React, { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import './Header.scss';

interface NavBarProps { }

const NavBar: FC<NavBarProps> = () => (
  <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Kompaerjon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Start</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Vergleiche" id="basic-nav-dropdown">
              <LinkContainer to="/comparison">
                <NavDropdown.Item>Übersicht</NavDropdown.Item>
              </LinkContainer>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
            <LinkContainer to="/contact">
              <Nav.Link>Kontakt</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
);

export default NavBar;
