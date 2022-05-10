import LoginButton from "./LoginButton.js";
import LogoutButton from "./LogoutButton.js";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { FaTimes, FaBars } from "react-icons/fa";

export default function Navigation() {
  const { isAuthenticated } = useAuth0();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div>
      <div onClick={() => setMenuOpen(!menuOpen)} className="menuIcon">
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Show Menu if menuOpen is true */}
      {(menuOpen || screenWidth >= 576) && (
        <div className="navList">
          <Link to="/">Home</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/profile">Profile</Link>
          {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
        </div>
      )}
    </div>
  );
}
