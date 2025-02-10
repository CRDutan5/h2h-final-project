import React from "react";
import "../register.css";
import { useRegister } from "../context/RegisterProvider";

export const Register = () => {
  const { createUserAccount, registerForm, setRegisterForm } = useRegister();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <form className="register-form" onSubmit={(e) => createUserAccount(e)}>
          <h1>Create Account</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerForm.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerForm.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={registerForm.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={registerForm.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            value={registerForm.zipcode}
            onChange={handleChange}
            required
          />
          <select
            name="position"
            value={registerForm.position}
            onChange={handleChange}
            required
          >
            <option value="">Select Your Position</option>
            <option value="Goalkeeper">Goalkeeper</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Forward">Forward</option>
          </select>

          <fieldset className="fieldset-container">
            <div className="fieldset-child-container">
              <input
                type="checkbox"
                id="twoFactorEnabled"
                name="twoFactorEnabled"
                checked={registerForm["twoFactorEnabled"] || false}
                onChange={handleChange}
              />
              <label htmlFor="twoFactorEnabled">
                Enable Two-Factor Authentication
              </label>
            </div>
          </fieldset>

          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
