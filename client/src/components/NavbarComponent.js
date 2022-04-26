import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import { GlobalContext } from "../HOC/Global";
import { useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

function NavbarComponent() {

  const { userState } = useContext(GlobalContext);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.info('Logging out...')
    setTimeout(() => {
      window.location.href = "http://localhost:3000/login"
    }, 1000)
  }

  return (
    <div>
      <ToastContainer />
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Ecologital</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
          {
              location.pathname === '/register' || location.pathname === '/SecuredPage' ? null :
                <Nav.Link href="/SecuredPage">Profile</Nav.Link>
            }
            {
              userState.user ? (userState.user.userLevel === 1 ?
                <Nav.Link href="/Users">Users</Nav.Link>
                : null)
                : null
            }
            {
              location.pathname === '/register' || location.pathname === '/SecuredPage' || location.pathname === '/Users' ? null :
                <Nav.Link href="/register">Sign Up</Nav.Link>
            }
            {
              location.pathname === '/SecuredPage' || location.pathname === '/login' || location.pathname === '/Users' ? null :
                <Nav.Link href="/login"> Log In</Nav.Link>
            }
            {
              location.pathname === '/login' || location.pathname === '/register' ? null :
                <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
