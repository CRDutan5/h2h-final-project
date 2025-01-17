import React from "react";
import "../register.css";
import { useRegister } from "../context/RegisterProvider.jsx";

export const Register = () => {
  const { createUserAccount, setRegisterForm } = useRegister();

  function handleChange(e) {
    setRegisterForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

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
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
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
