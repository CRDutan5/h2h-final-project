import React, { useState } from "react";
import "../login.css";
import { useUser } from "../context/userProvider";
// import { handleChange, handleLogin } from "../helper/formFunctions.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    userData,
    setErrorLogin,
    setUserData,
    setIsLoggedIn,
    twoFactorModal,
    setTwoFactorModal,
    toggleTwoFactor,
    setToggleTwoFactor,
    loginFormData,
    setLoginFormData,
  } = useUser();

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending the login request
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginFormData),
      });

      // Parsing the response body
      const data = await response.json();
      console.log(data);

      // Handling the 2FA scenario
      if (data.requiresOTP) {
        setToggleTwoFactor(true);
        navigate("/verification");
      }
      // Handling wrong credentials (401 Unauthorized)
      else if (response.status === 401) {
        setErrorLogin(true);
      } else {
        // If login is successful, store the token in localStorage
        localStorage.setItem("token", data.token);

        // Decode the token to extract the user ID
        const decodedToken = JSON.parse(atob(data.token.split(".")[1]));

        // Fetch user data with the decoded user ID
        const userRequest = await fetch(
          `http://localhost:5000/api/auth/user/${decodedToken.userId}`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          }
        );

        // Parsing the user data response
        const userRes = await userRequest.json();

        // Check if the user request was successful
        if (userRequest.ok) {
          setUserData(userRes.user); // Set the user data in context/state
          setIsLoggedIn(true); // Update the login state
          return true;
        } else {
          console.error("Error fetching user data", userRes);
          setErrorLogin(true); // Show login error state
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorLogin(true); // Handle network errors and show the error state
    }
  };

  const handleLoginFormChange = (e) => {
    setLoginFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  console.log(toggleTwoFactor);

  return (
    <div className="login-main-container">
      <form action="" className="form-container" onSubmit={handleLoginSubmit}>
        <h1>Player Login</h1>
        {/* <label htmlFor="email">Email</label> */}
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleLoginFormChange}
          required
        />
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleLoginFormChange}
          required
        />
        <button className="button" type="submit">
          Login
        </button>
        <p>Forgot Username / Password?</p>
      </form>
    </div>
  );
}
