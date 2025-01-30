import React from "react";
import "../register.css";
import { useRegister } from "../context/RegisterProvider";
import { useUser } from "../context/userProvider";

export const Register = () => {
  const { createUserAccount, registerForm, setRegisterForm } = useRegister();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };

  console.log(registerForm);

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
          onSubmit={(e) => createUserAccount(e)}
        >
          <h1>Create Account</h1>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={registerForm.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={registerForm.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={registerForm.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={registerForm.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="zipcode"
            id="zipcode"
            name="zipcode"
            placeholder="Zipcode"
            value={registerForm.zipcode}
            onChange={handleChange}
            required
          />
          <select
            value={registerForm.position}
            onChange={handleChange}
            id="position"
            name="position"
          >
            <option value="">Click to Select Your Position</option>
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
                Enable Two Factor Authentication
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
