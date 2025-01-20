import React from "react";
import "../register.css";
import { useRegister } from "../context/RegisterProvider";
import { handleChange } from "../helper/formFunctions"; // Import handleChange
import { useUser } from "../context/userProvider";

export const Register = () => {
  const { createUserAccount, registerForm, setRegisterForm } = useRegister();

  return (
    <div className="register-container">
      <div className="register-image-container">
        <img
          src="https://www.cupello.com/application/files/3916/9859/0788/shutterstock_717227614-min.jpg"
          alt="Register"
        />
      </div>
      <div className="register-form-container">
        <form
          action=""
          className="register-form"
          onSubmit={(e) => createUserAccount(e)} // Use createUserAccount
        >
          <h1>Create Account</h1>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={registerForm.email}
            onChange={(e) => handleChange(e, setRegisterForm)} // handleChange for updating form state
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={registerForm.password}
            onChange={(e) => handleChange(e, setRegisterForm)} // handleChange for updating form state
            required
          />
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={registerForm.firstName}
            onChange={(e) => handleChange(e, setRegisterForm)} // handleChange for updating form state
            required
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={registerForm.lastName}
            onChange={(e) => handleChange(e, setRegisterForm)} // handleChange for updating form state
            required
          />
          <input
            type="zipcode"
            id="zipcode"
            name="zipcode"
            placeholder="Zipcode"
            value={registerForm.zipcode}
            onChange={(e) => handleChange(e, setRegisterForm)} // handleChange for updating form state
            required
          />
          <select
            value={registerForm.position}
            onChange={(e) => handleChange(e, setRegisterForm)}
            id="position"
          >
            <option value="">Click to Select Your Position</option>
            <option value="Goalkeeper">Goalkeeper</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Forward">Forward</option>
          </select>
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
