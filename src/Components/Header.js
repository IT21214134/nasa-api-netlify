import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";
import {useDispatch} from 'react-redux';
import { setUser } from "../slice/userSlice.js";
import { selectUsers } from "../slice/userSlice.js";
import {useSelector} from 'react-redux';



function Header() {
  const dispatch = useDispatch();
  function handleSignOut(){
    // eslint-disable-next-line no-restricted-globals
    if(confirm('Are you sure you want to log out?')){
      signOut(auth).then(() => {
        // Sign-out successful.
        dispatch(setUser(null));
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
    }
    
  }

  const user = useSelector(selectUsers);

  return (
    <Navbar expand="lg" className="custom-navbar p-4" style={{backgroundColor: "#bab9b6"}}>
      <Container fluid>
        <Navbar.Brand href="/home" className='lobster-regular'><h1>NasaApi</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            
            navbarScroll
          >
            
            {user.currentUser &&
            <>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/neopage">NeoPage</Nav.Link>
              <Nav.Link href="/marsroverphotos">MarsRoverPhotos</Nav.Link>
              {/* <Nav.Link href="#" disabled>
                Link
              </Nav.Link> */}
            
            </>
            }
            </Nav>
            
          <Form className="d-flex">
            {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            /> */}
            
            {/* <Button variant="outline-success">Search</Button> */}
            {user.currentUser ?
            <Button onClick={handleSignOut} variant="outline-danger">LogOut</Button>:
            <Button variant="outline-success" disabled>WELCOME</Button>
            }
            
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

// function Header() {
//   return (
//     <header>
//       <h1>My NASA App</h1>
//       {/* Add navigation links or user authentication options */}
//     </header>
//   );
// }

// export default Header;

