import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>REVOLUTION 2026</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/rosters">
              <Nav.Link>Rosters</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/schedule">
              <Nav.Link>Schedule</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/standings">
              <Nav.Link>Standings</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/directory">
              <Nav.Link>Directory</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/stats">
              <Nav.Link>Stats</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;