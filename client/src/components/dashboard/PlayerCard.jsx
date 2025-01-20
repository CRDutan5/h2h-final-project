import React from "react";
import { useUser } from "../../context/userProvider";
import "./styles/playercard.css";

export const PlayerCard = () => {
  const { userData } = useUser();

  return (
    <div className="card-container">
      <h2>
        {userData.firstName} {userData.lastName}
      </h2>
      <img
        src="https://media.istockphoto.com/id/855049932/photo/portrait-of-teenage-soccer-player.jpg?s=612x612&w=0&k=20&c=l8-6IrPO-RXw8eWxFwPYrSmXSVqlzISKN0J6dMSIfCo="
        alt=""
      />
      <p>{userData.teamId ? "Change Me" : "Free Agent"}</p>
      <p>{userData.position}</p>
      <p>Current Record: {`${userData.wins} - ${userData.losses}`}</p>
      {/* <p>Member Since: {userData && userData.createdAt.slice(0, 4)}</p> */}
    </div>
  );
};
