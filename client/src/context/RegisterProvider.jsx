import React, { useContext, useState } from "react";
import { useUser } from "./userProvider";
import { useNavigate } from "react-router-dom";

const RegisterContext = React.createContext();

export const useRegister = () => {
  return useContext(RegisterContext);
};

export const RegisterProvider = ({ children }) => {
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    zipcode: "",
    position: "",
  });

  const { setErrorLogin, setUserData, setIsLoggedIn } = useUser();

  const navigate = useNavigate();

  const createUserAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
      if (response.ok) {
        alert("Successfully Created Account! Redirected to login!");
        navigate("/");
      } else {
        console.error("Could not create user due to invalid credentials");
        setErrorLogin(true);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <RegisterContext.Provider
      value={{ registerForm, setRegisterForm, createUserAccount }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
