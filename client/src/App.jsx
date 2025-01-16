import React from "react";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider, useUser } from "./context/userProvider.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { IncorrectLogin } from "./components/errorComponents/incorrectLogin.jsx";

export default function App() {
  const { userData, isLoggedIn, errorLogin } = useUser();
  return (
    <div>
      <Navbar />
      {errorLogin && <IncorrectLogin />}
      {isLoggedIn ? <Dashboard /> : <LandingPage />}
      <Footer />
    </div>
  );
}
