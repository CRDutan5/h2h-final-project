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

  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginFormData),
      });

      const data = await response.json();

      if (data.requiresOTP) {
        setToggleTwoFactor(true);
        navigate("/verification");
      } else if (response.status === 401 || response.status === 404) {
        setErrorMessage(data.message);
      } else {
        localStorage.setItem("token", data.token);
        const decodedToken = JSON.parse(atob(data.token.split(".")[1]));

        const userRequest = await fetch(
          `http://localhost:5000/api/auth/user/${decodedToken.userId}`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          }
        );
        const userRes = await userRequest.json();

        if (userRequest.ok) {
          setUserData(userRes.user);
          setIsLoggedIn(true);
          return true;
        } else {
          console.error("Error fetching user data", userRes);
          setErrorLogin(true);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorLogin(true);
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
