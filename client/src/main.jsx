// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { UserProvider } from "./context/userProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);
