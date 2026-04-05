import { Navbar, Container, Form, Button } from 'react-bootstrap';

function NavHeader ({onShowSidebar}) {
  return(
    <> 
      <Navbar bg="primary">
        <Container className="justify-content-start align-items-center">
          <Button variant="primary" className="d-md-none me-2 text-white" onClick={onShowSidebar}>
            <i className="bi bi-filter"></i>
          </Button>
          <Navbar.Brand href="#home" className='text-white'>
            <i className="bi bi-collection-play mx-2 text-white"></i>
            FilmLibrary
          </Navbar.Brand>
        </Container>
        <Container className="justify-content-end align-items-center">
          <Form>
            <Form.Control type="text" placeholder="Search" />
          </Form>
          <i className="bi bi-person-circle mx-2 text-white"></i>
        </Container>
      </Navbar>
    </>
  );
}

export default NavHeader;