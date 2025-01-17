import React, { useState } from "react";
import "../login.css";
import { useUser } from "../context/userProvider";
import { handleChange, handleLogin } from "../helper/formFunctions.js";

export default function Login() {
  const { userData, setErrorLogin, setUserData, setIsLoggedIn } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="login-main-container">
      <form
        action=""
        className="form-container"
        onSubmit={(e) =>
          handleLogin(e, formData, setErrorLogin, setUserData, setIsLoggedIn)
        }
      >
        <h1>Player Login</h1>
        {/* <label htmlFor="email">Email</label> */}
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={(e) => handleChange(e, setFormData)}
          required
        />
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange(e, setFormData)}
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
