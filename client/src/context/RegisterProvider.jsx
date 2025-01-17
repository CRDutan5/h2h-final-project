import React, { useContext, useState } from "react";
import { useUser } from "./userProvider";
import { handleLogin } from "../helper/formFunctions";
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
        const res = await response.json();
        const loginResponse = await handleLogin(
          e,
          { email: registerForm.email, password: registerForm.password }, // pass form data for login
          setErrorLogin,
          setUserData,
          setIsLoggedIn
        );
        if (loginResponse) {
          console.log("Login Successful after Registration!");
          navigate("/");
        } else {
          console.log("Login Failed after Registration");
        }
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
