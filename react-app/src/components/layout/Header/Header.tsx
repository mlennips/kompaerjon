import React, { FC, useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import AuthContext from '../../../context/AuthContext';
import ComparisonDataService from '../../../features/comparison/services/ComparisonDataService';
import { IComparison } from '../../../features/comparison/types';
import './Header.scss';

interface NavBarProps { }

const NavBar: FC<NavBarProps> = () => {
  const authContext = useContext(AuthContext);
  let userId = authContext.userId;
  let isAuthenticated = authContext.isAuthenticated;
  const [comparisons, setComparisons] = useState<IComparison[]>([]);

  useEffect(() => {
    if (userId) {
      ComparisonDataService.getAll(userId)
      .then((response: any) => {
        setComparisons(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    } else {
      setComparisons([]);
    }
  }, [isAuthenticated, userId]);

  const handleLogout = () => {
    authContext.logout();
  }
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href={userId ? '/users/' + userId : '/'}>Kompaerjon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={userId ? '/users/' + userId : '/'}>
              <Nav.Link>Start</Nav.Link>
            </LinkContainer>
            {isAuthenticated &&<NavDropdown title="Vergleiche" id="basic-nav-dropdown">
              <LinkContainer to="/comparison">
                <NavDropdown.Item>Übersicht</NavDropdown.Item>
              </LinkContainer>
              { comparisons.length > 0 && <NavDropdown.Divider /> }
              { comparisons.length > 0 && comparisons.map((comparison, index) => {
                return <LinkContainer key={index} to={'/users/'+userId+'/comparisons/'+comparison.id}>
                  <NavDropdown.Item>{comparison.name}</NavDropdown.Item>
                </LinkContainer>
              })}
            </NavDropdown>}
            <LinkContainer to="/contact">
              <Nav.Link>Kontakt</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/" onClick={handleLogout}>
              <Nav.Link>Abmelden</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>)
};

export default NavBar;
