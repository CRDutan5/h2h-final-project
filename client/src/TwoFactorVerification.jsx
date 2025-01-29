import React, { useState } from "react";
import "./two-factor.css";
import { useUser } from "./context/userProvider";
import { useNavigate } from "react-router-dom";

export const TwoFactorVerification = () => {
  const [inputOtp, setInputOtp] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [sentOTPResponse, setSentOTPResponse] = useState("");

  const { loginFormData, setIsLoggedIn } = useUser();

  const navigate = useNavigate();

  const handleInputFieldChange = (e, nextFieldId, prevFieldId) => {
    const currentField = e.target;

    if (e.key === "Backspace" && currentField.value === "") {
      const prevField = document.getElementById(prevFieldId);
      if (prevField) {
        prevField.focus();
      }
    } else if (currentField.value.length === 1) {
      const nextField = document.getElementById(nextFieldId);
      if (nextField) nextField.focus();
    }
  };

  const handleStateChange = (e) => {
    const id = e.target.id;
    const index = id[id.length - 1] - 1;

    setInputOtp((prevState) => {
      const updatedOtp = [...prevState];
      updatedOtp[index] = e.target.value;
      return updatedOtp;
    });
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setSentOTPResponse("");
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/2fa/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("loginFormEmail"),
            inputOtp: inputOtp.join(""),
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        localStorage.removeItem("inTwoFactorFlow");
        localStorage.removeItem("loginFormEmail");
        navigate("/");
        console.log("user authenticated!!!!");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Verification Failed", error);
    }
  };

  const requestNewOneTimePin = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/2fa/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: loginFormData.email }),
      });
      const data = await response.json();
      if (response.status === 401) {
        // alert("User has to wait cool down");
      }
      if (response.status === 200) {
        // alert("New OTP has been sent");
      }
      setSentOTPResponse(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="two-factor-main-container">
      <h1>Two Factor Verification</h1>
      <p>An email has been sent containing the OTP. Please enter it below</p>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {sentOTPResponse && <p style={{ color: "black" }}>{sentOTPResponse}</p>}
      <form onSubmit={handleVerification}>
        <div>
          <input
            type="text"
            maxLength="1"
            id="otp-1"
            onKeyUp={(e) => handleInputFieldChange(e, "otp-2", "otp-1")}
            value={inputOtp[0]}
            onChange={handleStateChange}
            required
          />
          <input
            type="text"
            maxLength="1"
            id="otp-2"
            onKeyUp={(e) => handleInputFieldChange(e, "otp-3", "otp-1")}
            value={inputOtp[1]}
            onChange={handleStateChange}
            required
          />
          <input
            type="text"
            maxLength="1"
            id="otp-3"
            onKeyUp={(e) => handleInputFieldChange(e, "otp-4", "otp-2")}
            value={inputOtp[2]}
            onChange={handleStateChange}
            required
          />
          <input
            type="text"
            maxLength="1"
            id="otp-4"
            onKeyUp={(e) => handleInputFieldChange(e, "otp-5", "otp-3")}
            value={inputOtp[3]}
            onChange={handleStateChange}
            required
          />
          <input
            type="text"
            maxLength="1"
            id="otp-5"
            onKeyUp={(e) => handleInputFieldChange(e, "otp-6", "otp-4")}
            value={inputOtp[4]}
            onChange={handleStateChange}
            required
          />
          <input
            type="text"
            maxLength="1"
            id="otp-6"
            onKeyUp={(e) => handleInputFieldChange(e, null, "otp-5")}
            value={inputOtp[5]}
            onChange={handleStateChange}
            required
          />
        </div>
        <button type="submit">Verify</button>
      </form>
      <button onClick={requestNewOneTimePin}>Request New OTP</button>
    </div>
  );
};
