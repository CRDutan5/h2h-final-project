import React from "react";
import "./errorStyles.css";
import { useUser } from "../../context/userProvider";

export const IncorrectLogin = () => {
  const { errorLogin, setErrorLogin } = useUser();

  setTimeout(() => {
    setErrorLogin(false);
  }, "3000");

  return (
    <div className="incorrect-login-container">
      <p>Incorrect Password or Email</p>
    </div>
  );
};
