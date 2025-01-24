import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import { useUser } from "../context/userProvider";

export default function LandingPage() {
  const { toggleTwoFactor } = useUser();
  return (
    <div className="landing-page-container">
      <div className="image-container">
        <div className="quick-about-container">
          <p>
            Connect with players, create teams, schedule matches, and improve
            your skills in a vibrant soccer community. Whether you're here to
            compete, have fun, or make new friends, this platform brings soccer
            enthusiasts together. Join us today and be part of the action!
          </p>
          <Link to="/register">
            <button className="button" style={{ marginLeft: "15px" }}>
              Sign Up!
            </button>
          </Link>
        </div>
        <div className="signup-container">
          <Login />
        </div>
      </div>
      <div className="features-container">
        <div className="features-list-container">
          <div className="feature-card">
            <h2>Social Media</h2>
            <p>
              Connect with fellow soccer enthusiasts, share your highlights, and
              keep up with the latest team updates in the community.
            </p>
          </div>
          <div className="feature-card">
            <h2>Rank Up</h2>
            <p>
              Climb the ranks and earn your spot at the top by winning matches
              and participating in challenges across the community.
            </p>
          </div>
          <div className="feature-card">
            <h2>Make Friends</h2>
            <p>
              Meet new players, join teams, and create lasting connections with
              people who share your passion for soccer.
            </p>
          </div>
          <div className="feature-card">
            <h2>Have Fun</h2>
            <p>
              Enjoy the game you love with exciting matches, challenges, and a
              community that celebrates every goal and win!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
