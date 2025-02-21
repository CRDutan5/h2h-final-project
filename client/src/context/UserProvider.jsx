import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [errorLogin, setErrorLogin] = useState(null);

  const [toggleTwoFactor, setToggleTwoFactor] = useState(false);

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        // Currently a valid token
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
          localStorage.removeItem("token");
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
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn,
        errorLogin,
        setErrorLogin,
        toggleTwoFactor,
        setToggleTwoFactor,
        loginFormData,
        setLoginFormData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
