import React from "react";
import { useUser } from "../../context/UserProvider.jsx";
import "./styles/playercard.css";

export const PlayerCard = ({ isCurrentUserPlayerCard }) => {
  const { userData } = useUser();

  return (
    <div className="card-container">
      <h2 className="player-name">
        {userData.firstName} {userData.lastName}
      </h2>
      <img
        className="player-image"
        src="https://media.istockphoto.com/id/855049932/photo/portrait-of-teenage-soccer-player.jpg?s=612x612&w=0&k=20&c=l8-6IrPO-RXw8eWxFwPYrSmXSVqlzISKN0J6dMSIfCo="
        alt="Player"
      />
      <p className="player-status">
        {userData.teamId ? "Change Me" : "Free Agent"}
      </p>
      <p className="player-position">{userData.position}</p>
      <p className="player-record">
        Current Record: {`${userData.wins} - ${userData.losses}`}
      </p>
    </div>
  );
};
