import React, { Component } from "react";
import imbd from '../imbd.png';
import "bootstrap/dist/css/bootstrap.min.css";

class Navbar extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
          <img src={imbd} width="120" height="50"></img>
          </a>
        </nav>
      </>
    );
  }
}

export default Navbar;
