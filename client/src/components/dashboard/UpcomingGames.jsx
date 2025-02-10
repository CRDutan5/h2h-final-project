import React from "react";
import "./styles/upcoming-games.css";
import { useUser } from "../../context/UserProvider";

export const UpcomingGames = () => {
  const { userData } = useUser();
  return (
    <div className="upcoming-games-child-container">
      <h1 className="upcoming-games-title">UpcomingGames</h1>
      {userData.teamId ? (
        <p className="team-status">I Have a team</p>
      ) : (
        <p className="team-status">I dont have a team to show games</p>
      )}
    </div>
  );
};
