import React, { useEffect, useState } from "react";
import "../exploreplayers/styles/explore-players.css";

export const ExplorePlayers = () => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/allUsers`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllPlayers(data.users);
        setFilteredPlayers(data.users);
      } catch (error) {
        console.error("Error Fetching Users", error);
      }
    };

    getAllUsers();
  }, []);

  //   Need to fix that when I backspace it doesnt retrieve users correctly
  // WILL HAVE TO OPTIMIZE IN THE FUTURE, CANNOT HAVE ALL USERS STORED WHEN USER BASE GROWS
  useEffect(() => {
    if (searchInput.length > 0) {
      const players = allPlayers.filter((player) =>
        player.firstName.includes(searchInput)
      );
      setFilteredPlayers(players);
    } else {
      setFilteredPlayers(allPlayers);
    }
  }, [searchInput]);

  console.log(filteredPlayers);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="explore-players-parent-container">
      <div className="explore-child-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search players by name..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <h1>Filtering System</h1>

        <div className="table-wrapper">
          <table className="user-list-table">
            <thead>
              <tr className="table-row-head">
                <th>Player</th>
                <th>Team</th>
                <th>Position</th>
                <th>Zip</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.length > 0 &&
                filteredPlayers.map((player) => (
                  <tr className="table-row-body" key={player._id}>
                    <td>
                      <div className="player-div">
                        <img
                          src="https://media.istockphoto.com/id/855049932/photo/portrait-of-teenage-soccer-player.jpg?s=612x612&w=0&k=20&c=l8-6IrPO-RXw8eWxFwPYrSmXSVqlzISKN0J6dMSIfCo="
                          alt=""
                        />
                        <p>{`${player.firstName} ${player.lastName}`}</p>
                      </div>
                    </td>
                    <td>{player.teamId ? player.teamId : "Free Agent"}</td>
                    <td>{player.position ? player.position : "NA"}</td>
                    <td>{player.zipcode ? player.zipcode : "456789"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="player-display-child-container">
        <h1>Yerrr</h1>
      </div> */}
    </div>
  );
};
