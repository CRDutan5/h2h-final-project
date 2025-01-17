import React, { useContext, useState } from "react";
import { useUser } from "./userProvider";

const RegisterContext = React.createContext();

export const useRegister = () => {
  return useContext(RegisterContext);
};

// const { handleLogin } = useUser();

export const RegisterProvider = ({ children }) => {
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const createrUserAccount = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
      if (response.ok) {
        // const executeLogin = await handleLogin();
        if (executeLogin) {
          console.log("Login Is Good");
        } else {
          console.log("Bad login");
        }
      } else {
        console.log(
          "Could Not Create User because credentials interfere with guidelines"
        );
      }
    } catch (error) {
      console.error(error, "Error creating User");
    }
  };

  return (
    <RegisterContext.Provider
      value={{ registerForm, setRegisterForm, createrUserAccount }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
