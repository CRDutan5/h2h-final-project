import React, { useState } from "react";
import { PlayerCard } from "./PlayerCard.jsx";
import "../../dashboard.css";
import { Achievements } from "./Achievements.jsx";
import { UpcomingGames } from "./UpcomingGames.jsx";

export const Dashboard = () => {
  const [isCurrentUserPlayerCard, setIsCurrentUserPlayerCard] = useState(true);
  return (
    <div className="dashboard-main-container">
      <div className="dashboard-content-container">
        <div className="player-container">
          <PlayerCard isCurrentUserPlayerCard={isCurrentUserPlayerCard} />
        </div>
        <div className="upcoming-games-container">
          <UpcomingGames />
        </div>
        <div className="edit-profile-container">
          <Achievements />
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
