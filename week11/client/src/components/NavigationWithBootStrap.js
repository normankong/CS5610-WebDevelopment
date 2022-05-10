import LoginButton from "./LoginButton.js";
import LogoutButton from "./LogoutButton.js";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavigationWithBootStrap() {
  const { isAuthenticated } = useAuth0();
//   const [menuOpen, setMenuOpen] = React.useState(false);
//   const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   });

  return (
    <Navbar bg="light" expand="sm" variant="light" collapseOnSelect>
      <Container>
        {/* <Navbar.Brand as={Link} to="/">Home</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            <Nav.Item>
            {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    // <div>
    //   <div onClick={() => setMenuOpen(!menuOpen)} className="menuIcon">
    //     {menuOpen ? <FaTimes /> : <FaBars />}
    //   </div>

    //   {/* Show Menu if menuOpen is true */}
    //   {(menuOpen || screenWidth >= 576) && (
    //     <div className="navList">
    //       <Link to="/">Home</Link>
    //       <Link to="/tasks">Tasks</Link>
    //       <Link to="/profile">Profile</Link>
    //       {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
    //     </div>
    //   )}
    // </div>
  );
}
