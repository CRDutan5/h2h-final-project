import React from "react";
import logo from "../assets/h2h-proto-logo.png";
import "../navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userProvider";

export default function Navbar() {
  const { isLoggedIn, userData, setIsLoggedIn } = useUser();

  const navigate = useNavigate();

  function handleLogout(setIsLoggedIn) {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/");
    return;
  }
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
      <div className="link-container">
        <p>Team Dashboard</p>
        <p>Team Finder</p>
        <Link to="/explorePlayers" style={{ color: "white" }}>
          <p>Explore Players</p>
        </Link>
        <p>Matches</p>
        {isLoggedIn ? (
          <div className="welcome-container">
            <p>Welcome</p>
            <p>{userData.firstName}</p>
          </div>
        ) : null}
        {isLoggedIn && (
          <Link to="/accountSettings">
            <p>Account Settings</p>
          </Link>
        )}
        {isLoggedIn && (
          <p onClick={() => handleLogout(setIsLoggedIn)}>Sign Out</p>
        )}
      </div>
    </div>
  );
}
