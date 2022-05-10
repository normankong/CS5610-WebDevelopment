/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import SearchBox from "./SearchBox";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avater/index.js"
// import Avatar from 'react-avatar';

import logo from "../assets/images/logo.svg";

import { useSessionStorage } from "../utils/useSessionStorage";
import "./Header.css";

export default function Header() {

  const navigate = useNavigate();
  const { user, loginWithRedirect, logout } = useAuth0();
  const [accessToken, setAccessToken] = useSessionStorage("accessToken", null);
  const [userProfile, setUserProfile] = useSessionStorage("userProfile", null);

  useEffect(() => {
    if (user != null) {
      setUserProfile(user);
    }
  }, [user]);

  const handleSearch = (symbol) => {
    navigate(`/Search`,   { state : {symbol} });
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handLogout = () => {
    logout({ returnTo: window.location.origin });
    setAccessToken(null);
    setUserProfile(null);
  };

  const ProfileImage = () => {
    // let src = userProfile.picture;
    let name = userProfile.name;
    return (
      <>
        <Avatar color={Avatar.getRandomColor(name, ['#A62A21', '#7e3794', '#0B51C1', '#3A6024', '#A81563', '#B3003C'])} 
        name={name} 
        size="30px" round="20px" className="profileImage d-inline-block align-top"/>
      </>
    );
  };

  const DefaultImage = () => {
    return (
      <img
        alt=""
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
    );
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          {userProfile != null ? <ProfileImage /> : <DefaultImage />} Investment
          Portfolio Tracker
        </Navbar.Brand>
        {userProfile != null ? (
          <>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              ></Nav>
              <SearchBox handleSearch={handleSearch} /> 
              <Button variant="primary" onClick={handLogout} className="m-1">
                Logout
              </Button>
            </Navbar.Collapse>
          </>
        ) : (
          <Button variant="primary" onClick={handleLogin} >
            Login / Sign In
          </Button>
        )}
      </Container>
    </Navbar>
  );
}
