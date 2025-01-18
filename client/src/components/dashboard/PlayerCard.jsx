import React from "react";
import { useUser } from "../../context/userProvider";
import "./styles/playercard.css";

export const PlayerCard = () => {
  const { userData } = useUser();

  return (
    <div className="card-container">
      <p>
        {userData.firstName} {userData.lastName}
      </p>
      <img
        src="https://i.ytimg.com/vi/GJGbg1TO5FQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAQgf5fTkRt3IFk6QhTj4h4-Gm3BA"
        alt=""
      />
      <p>Team Marvel</p>
      <p>Position: DPS</p>
      <p>Wins: 1</p>
      <p>Losses: 3</p>
    </div>
  );
};
