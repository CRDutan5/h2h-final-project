import React from "react";
import { PlayerCard } from "./PlayerCard.jsx";
import "../../dashboard.css";
import { EditProfile } from "./EditProfile.jsx";
import { UpcomingGames } from "./UpcomingGames.jsx";

export const Dashboard = () => {
  return (
    <div className="dashboard-main-container">
      <div className="dashboard-content-container">
        <div className="player-container">
          <PlayerCard />
        </div>
        <div className="upcoming-games-container">
          <UpcomingGames />
        </div>
        <div className="edit-profile-container">
          <EditProfile />
        </div>
      </div>
      <div className="highlight-container">
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
      </div>
    </div>
  );
};
