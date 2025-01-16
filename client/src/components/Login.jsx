import React, { useState } from "react";
import "../login.css";
import { useUser } from "../context/userProvider";

export default function Login() {
  const { userData, handleChange, handleLogin } = useUser();

  return (
    <div className="login-main-container">
      <form action="" className="form-container" onSubmit={handleLogin}>
        <h1>Player Login</h1>
        {/* <label htmlFor="email">Email</label> */}
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="button" type="submit">
          Login
        </button>
        <p>Forgot Username / Password?</p>
      </form>
    </div>
  );
}
