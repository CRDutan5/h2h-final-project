import React from "react";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      {/* <h1>App</h1> */}
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
}
