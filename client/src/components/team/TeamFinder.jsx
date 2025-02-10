import React, { useEffect, useState } from "react";
import "./team-finder.css";
import { useUser } from "../../context/UserProvider";
import { Link } from "react-router-dom";

export const TeamFinder = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { userData } = useUser();

  useEffect(() => {
    const fetchAllTeams = async () => {
      const response = await fetch(`http://localhost:5000/api/teams`);
      const data = await response.json();
      setAllTeams(data.teams);
      setFilteredTeams(data.teams);
    };
    fetchAllTeams();
  }, []);

  useEffect(() => {
    if (searchInput.length > 0) {
      const teams = allTeams.filter((team) => team.name.includes(searchInput));
      setFilteredTeams(teams);
    } else {
      setFilteredTeams(allTeams);
    }
  }, [searchInput]);

  const calculateRosterCount = (membersObj) => {
    let counter = 0;
    for (const position in membersObj) {
      if (membersObj[position]) {
        counter += membersObj[position].length;
      }
    }
    return counter;
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  console.log(userData);

  return (
    <div className="team-finder-parent-container">
      <div className="filter-wrapper">
        <div className="filter-content">
          <p>Filter System</p>
        </div>
      </div>
      <div className="table-wrapper">
        <div className="search-create-wrapper">
          <input
            type="text"
            placeholder="Search teams by name..."
            onChange={handleSearchInputChange}
            value={searchInput}
          />
          {userData.teamId === null && (
            <div
              className="search-create-wrapper"
              style={{ marginBottom: "0px" }}
            >
              <p>OR</p>
              <Link to="/createTeam">
                <button className="create-team-button">Create New Team</button>
              </Link>
            </div>
          )}
        </div>

        <table className="user-list-table">
          <thead>
            <tr className="table-row-head">
              <th>Team</th>
              <th>Captain</th>
              <th>Roster</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.length > 0 &&
              filteredTeams.map((team) => (
                <tr className="table-row-body" key={team._id}>
                  <td>
                    <div className="player-div">
                      <img
                        src={
                          team.logo
                            ? team.logo
                            : "https://www.essentialtraining.ie/wp-content/uploads/2018/11/Screen-Shot-2018-11-06-at-6.41.38-pm.png"
                        }
                      />
                      <p>{team.name}</p>
                    </div>
                  </td>
                  <td>{team.captainId}</td>
                  <td>{`${team && calculateRosterCount(team.members)}/23`}</td>
                  <td>{team.points ? team.points : 0}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
