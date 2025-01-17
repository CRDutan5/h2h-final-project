import React from "react";
import logo from "../assets/h2h-proto-logo.png";
import "../navbar.css";
import { Link } from "react-router-dom";
import { useUser } from "../context/userProvider";

export default function Navbar() {
  const { isLoggedIn, userData } = useUser();
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <div className="link-container">
        <p>Links</p>
        <p>Links</p>
        <p>Links</p>
        <p>Links</p>
        {isLoggedIn ? (
          <div className="welcome-container">
            <p>Welcome</p>
            <p>{userData.firstName}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
