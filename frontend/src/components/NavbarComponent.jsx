import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


function NavbarComponent() {
  return (
    <Navbar bg='dark' expand="lg" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/">Supply</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Products" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/products">
                Products
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/products/delete">
               Delete Product
                </NavDropdown.Item>
            </NavDropdown>
 
            <Nav.Link href="#action2">Purchase Orders</Nav.Link>
            <Nav.Link href="#action3">Inventory</Nav.Link>
            <Nav.Link href="#action4">Suppliers</Nav.Link>
            <Nav.Link href="#action5">Transport Routes</Nav.Link>
            <Nav.Link href="/relationship">Create Relationship</Nav.Link>
            <NavDropdown title="Agregaciones" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/products/low-stock">Low Stock</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/suppliers/reputation">
                Suppliers High Rep
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/product/type">
                Product by Type
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/transport_routes/top-companies">
                Cantidad Transport Routes
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;