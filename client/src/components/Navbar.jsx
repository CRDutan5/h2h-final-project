import React, { useState } from "react";
import logo from "../assets/h2h-proto-logo.png";
import "../navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userProvider";

export default function Navbar() {
  const { isLoggedIn, userData, setIsLoggedIn } = useUser();
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [showPlayerDropdown, setShowPlayerDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

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
        <div
          className="dropdown"
          onMouseEnter={() => setShowTeamDropdown(true)}
          onMouseLeave={() => setShowTeamDropdown(false)}
        >
          <p className="dropdown-trigger">Teams</p>
          {showTeamDropdown && (
            <div className="dropdown-content">
              <Link to="/teamDashboard">
                <p>Team Dashboard</p>
              </Link>
              <Link to="/teamFinder">
                <p>Team Finder</p>
              </Link>
              <Link to="/leaderboards">
                <p>Leaderboards</p>
              </Link>
            </div>
          )}
        </div>

        <div
          className="dropdown"
          onMouseEnter={() => setShowPlayerDropdown(true)}
          onMouseLeave={() => setShowPlayerDropdown(false)}
        >
          <p className="dropdown-trigger">Players</p>
          {showPlayerDropdown && (
            <div className="dropdown-content">
              <Link to="/explorePlayers">
                <p>Explore Players</p>
              </Link>
              <Link to="/playerStats">
                <p>Player Stats</p>
              </Link>
            </div>
          )}
        </div>

        <p>Matches</p>
        {isLoggedIn ? (
          <div
            className="dropdown"
            onMouseEnter={() => setShowAccountDropdown(true)}
            onMouseLeave={() => setShowAccountDropdown(false)}
          >
            <p className="dropdown-trigger">Welcome {userData.firstName}</p>
            {showAccountDropdown && (
              <div className="dropdown-content">
                <Link to="/accountSettings">
                  <p>Account Settings</p>
                </Link>
                <p onClick={() => handleLogout(setIsLoggedIn)}>Sign Out</p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
