import React from "react";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider } from "./context/userProvider";

export default function App() {
  return (
    <div>
      <UserProvider>
        <Navbar />
        <LandingPage />
      </UserProvider>
      <Footer />
    </div>
  );
}
