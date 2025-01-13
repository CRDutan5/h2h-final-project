import React from "react";
import "../login.css";

export default function Login() {
  return (
    <div className="login-main-container">
      <form action="" className="form-container">
        <h1>Player Login</h1>
        {/* <label htmlFor="email">Email</label> */}
        <input type="text" id="email" name="email" placeholder="Email" />
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
        />
        <button className="button">Login</button>
        <p>Forgot Username / Password?</p>
      </form>
    </div>
  );
}
