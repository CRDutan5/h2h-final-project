import React from "react";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider, useUser } from "./context/userProvider.jsx";
import { Dashboard } from "./components/dashboard/Dashboard.jsx";
import { IncorrectLogin } from "./components/errorComponents/incorrectLogin.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import { Register } from "./components/Register.jsx";
import { RegisterProvider } from "./context/RegisterProvider.jsx";
import { ExplorePlayers } from "./components/exploreplayers/ExplorePlayers.jsx";
import { AccountSettings } from "./components/accountSettings/AccountSettings.jsx";
import { TwoFactorVerification } from "./TwoFactorVerification.jsx";

export default function App() {
  const { userData, isLoggedIn, errorLogin, toggleTwoFactor } = useUser();

  return (
    <div className="">
      <Navbar />
      {errorLogin && <IncorrectLogin />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard /> : <LandingPage />}
        />
        <Route
          path="/register"
          element={
            <RegisterProvider>
              <Register />
            </RegisterProvider>
          }
        />
        <Route path="/explorePlayers" element={<ExplorePlayers />} />
        <Route
          path="/accountSettings"
          element={isLoggedIn && <AccountSettings />}
        />
        <Route
          path="/verification"
          element={
            localStorage.getItem("inTwoFactorFlow") ? (
              <TwoFactorVerification />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}
