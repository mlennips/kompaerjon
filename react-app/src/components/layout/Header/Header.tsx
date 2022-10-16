import React, { FC, useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import ComparisonDataService from '../../../features/comparison/services/ComparisonDataService';
import { IComparison } from '../../../features/comparison/types';
import './Header.scss';

interface NavBarProps { }

const NavBar: FC<NavBarProps> = () => {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  let userId = context.userId;
  const [comparisons, setComparisons] = useState<IComparison[]>();

  useEffect(() => {
    if (userId) {
      ComparisonDataService.getAll(userId)
      .then((response: any) => {
        setComparisons(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
    }
  }, [userId]);

  const openComparison = (userId: string, comparisonId: string) => {
    navigate('/users/' + userId + '/comparisons/' + comparisonId);
  };
  
  return (
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
              { userId && <NavDropdown.Divider /> }
              { userId && comparisons?.map((comparison, index) => {
                return <LinkContainer key={index} to={'/users/'+userId+'/comparisons/'+comparison.id}>
                  <NavDropdown.Item>{comparison.name}</NavDropdown.Item>
                </LinkContainer>
              })}
              
            </NavDropdown>
            <LinkContainer to="/contact">
              <Nav.Link>Kontakt</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>)
};

export default NavBar;
