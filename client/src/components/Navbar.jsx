import React from "react";
import logo from "../assets/h2h-proto-logo.png";
import "../navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div>
        <img src={logo} alt="" />
      </div>
      <div className="link-container">
        <p>Links</p>
        <p>Links</p>
        <p>Links</p>
        <p>Links</p>
      </div>
    </div>
  );
}
