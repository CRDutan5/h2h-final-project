import React, { useState } from "react";
import "./create-team.css";
import { useNavigate } from "react-router-dom";

export const CreateTeam = () => {
  const [teamDetails, setTeamDetails] = useState({
    name: "",
    logo: "",
    zip: "",
    homeColor: "",
    awayColor: "",
  });

  const [creationStatus, setCreationStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTeamDetails({ ...teamDetails, [e.target.id]: e.target.value });
  };

  // Account is not being refreshed when joining a team

  const handleCreateTeamSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setCreationStatus("Invalid token");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(teamDetails),
      });

      const data = await res.json();

      setCreationStatus(data.message);

      if (res.ok) {
        // Navigate to the Team Dashboard but for now back to team finder
        // navigate("/teamFinder");
      }
    } catch (error) {
      setCreationStatus("An error occured. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-team-parent">
      <form className="create-form" onSubmit={handleCreateTeamSubmit}>
        <legend>Create Team</legend>
        {creationStatus && (
          <p style={{ color: "greenyellow" }}>{creationStatus}</p>
        )}
        <input
          id="name"
          type="text"
          placeholder="Team Name"
          onChange={handleChange}
        />
        <input
          id="logo"
          type="text"
          placeholder="Logo URL"
          onChange={handleChange}
        />
        <input
          id="zip"
          type="text"
          placeholder="Zip Code"
          onChange={handleChange}
        />
        <select id="homeColor" onChange={handleChange}>
          <option value="">Select Home Color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="purple">Purple</option>
        </select>
        <select id="awayColor" onChange={handleChange}>
          <option value="">Select Away Color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="purple">Purple</option>
        </select>
        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Team"}
        </button>
      </form>
    </div>
  );
};
