import React from "react";
import "./styles/upcoming-games.css";
import { useUser } from "../../context/userProvider";

export const UpcomingGames = () => {
  const { userData } = useUser();
  return (
    <div className="upcoming-games-child-container">
      <h1>UpcomingGames</h1>
      {userData.teamId ? (
        <p>I Have a team</p>
      ) : (
        <p>I dont have a team to show games</p>
      )}
    </div>
  );
};
