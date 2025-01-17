import React from "react";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider, useUser } from "./context/userProvider.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { IncorrectLogin } from "./components/errorComponents/incorrectLogin.jsx";
import { Route, Routes } from "react-router-dom";
import { Register } from "./components/Register.jsx";

export default function App() {
  const { userData, isLoggedIn, errorLogin } = useUser();
  return (
    <div className="">
      <Navbar />
      {errorLogin && <IncorrectLogin />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard /> : <LandingPage />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}
