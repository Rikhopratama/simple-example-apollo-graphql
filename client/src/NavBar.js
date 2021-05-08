import { Link } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => (
  <Navbar bg='light' expand='lg'>
    <Navbar.Brand href='#home'>Product</Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <Nav.Link>
          <Link to='/list'>List</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to='/add'>Add</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to='/subscribe_product'>Subscribe Product</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to='/upload_file'>Upload File</Link>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavBar;
