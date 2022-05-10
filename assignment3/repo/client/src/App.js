
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth0Callback from "./components/Auth0Callback";

import PreLogin from "./pages/prelogin";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Search from "./pages/search";
import Detail from "./pages/detail";

import React from "react";

import "./App.css";

function App() {

  return (
    <>
      <Header />
      <div className="body">
      <Routes>
        <Route path="/" element={<PreLogin/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Search" element={<Search/>}/>
        <Route path="/Detail" element={<Detail/>}/>
        <Route path="/Auth0Callback" element={<Auth0Callback/>}/>
        <Route path="*" element={<h1>Sorry 404</h1>} />
      </Routes>
      </div>
      <Footer/>
      
    </>
  );
}

export default App;
