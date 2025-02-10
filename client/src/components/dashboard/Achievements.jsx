import React from "react";
import "./styles/edit-profile.css";
import { useUser } from "../../context/UserProvider.jsx";

export const Achievements = () => {
  return (
    <div className="achievements-container">
      <h1 className="achievements-title">Achievements</h1>
      <p className="achievements-description">
        Your achievements will be listed here.
      </p>
    </div>
  );
};
