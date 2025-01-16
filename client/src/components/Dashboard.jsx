import React from "react";
import { useUser } from "../context/userProvider";

export const Dashboard = () => {
  const { setIsLoggedIn } = useUser();

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    return;
  }

  return (
    <div>
      <button className="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};
