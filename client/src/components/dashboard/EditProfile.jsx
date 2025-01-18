import React from "react";
import "./styles/edit-profile.css";
import { useUser } from "../../context/userProvider";

export const EditProfile = () => {
  const { userData, setUserData } = useUser();

  return (
    <div className="edit-profile-child-container">
      <h2>Edit Profile</h2>
      <p>{userData.firstName}</p>
      <p>{userData.lastName}</p>
    </div>
  );
};
