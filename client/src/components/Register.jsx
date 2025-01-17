import React from "react";
import "../register.css";

export const Register = () => {
  return (
    <div className="register-container">
      <div className="register-image-container">
        <img
          src="https://www.cupello.com/application/files/3916/9859/0788/shutterstock_717227614-min.jpg"
          alt=""
        />
      </div>
      <div className="register-form-container">
        <form action="" className="register-form">
          <h1>Create Account</h1>
          <input type="text" id="email" name="email" placeholder="Email" />
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
          />
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
          />
          {/* <input
            type="text"
            id="zipcode"
            name="zipcode"
            placeholder="Zip Code"
          /> */}
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
