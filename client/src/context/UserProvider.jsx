import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [errorLogin, setErrorLogin] = useState(null);

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const request = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const res = await request.json();

      if (request.ok) {
        console.log("Login Successful!");
        localStorage.setItem("token", res.token);
        const decoded = await JSON.parse(atob(res.token.split(".")[1]));
        // Decoding token gives us the userId
        // exp : 1736817888
        // iat :1736814288
        // userId:"67858b90f645b78495726898"

        const userRequest = await fetch(
          `http://localhost:5000/api/auth/user/${decoded.userId}`,
          {
            headers: {
              Authorization: `Bearer ${res.token}`,
            },
          }
        );
        const userRes = await userRequest.json();
        if (userRequest.ok) {
          setUserData(userRes.user);
          setIsLoggedIn(true);
        } else {
          console.log("Error in user request");
        }
      } else {
        console.log(res);
        // Misinformation Handler
        // {error: "Wrong Password"}
        // {error: "No User Found"}
        setErrorLogin(true);

        console.log(res);
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp > currentTime) {
          setIsLoggedIn(true);

          const userRequest = fetch(
            `http://localhost:5000/api/auth/user/${decoded.userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          userRequest
            .then((userRes) => userRes.json())
            .then((userData) => {
              setUserData(userData.user);
            })
            .catch((error) => console.log("Error fetching user data:", error));
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
      }
    }
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        formData,
        handleChange,
        handleLogin,
        userData,
        isLoggedIn,
        setIsLoggedIn,
        errorLogin,
        setErrorLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
