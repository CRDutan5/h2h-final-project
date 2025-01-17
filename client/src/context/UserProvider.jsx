import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [errorLogin, setErrorLogin] = useState(null);

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
        userData,
        setUserData,
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
