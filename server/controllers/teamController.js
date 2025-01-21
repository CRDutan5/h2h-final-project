import Team from "../models/team.js";
import User from "../models/user.js";

/*
Create team has to:
* Create a team [Done]
* Captain id has to be assigned to the creator [Done]
* User key of teamId has to change
* Team Members.position has to update the array
*/

export const createTeam = async (req, res) => {
  try {
    const { name, logo } = req.body;
    const captainId = req.user.userId;

    const newTeam = new Team({
      name,
      logo,
      captainId,
    });

    await newTeam.save();

    // Call addTeamPlayer without sending a response directly
    const addPlayerResult = await addTeamPlayer(req, null, newTeam._id);

    if (!addPlayerResult.success) {
      // Handle failure in adding the player
      return res.status(400).json({ message: addPlayerResult.message });
    }

    res.status(200).json({
      message: "Team created and captain added successfully",
      teamId: newTeam._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating team" });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);

    res.status(200).json({ team });
  } catch (error) {
    res.status(500).json({ message: "Could not get team info" });
  }
};

export const getAllTeams = async () => {};

// This can be reusable, I can use this for when a player wants to join a team by using the req.params. However, if the user is creating the team we can pass in the newly generated teamId in the parameters as a third optional parameter

// We can try to later optimize so we get appropriate status codes, If teamIdFromFunction is available return one else return the other
export const addTeamPlayer = async (req, res, teamIdFromFunction = null) => {
  try {
    const loggedInUser = await User.findById(req.user.userId);

    if (loggedInUser.teamId !== null) {
      return res
        ? res.status(400).json({ message: "User is already part of a team" })
        : { success: false, message: "User is already part of a team" };
    }

    const teamId = teamIdFromFunction || req.params.teamId;
    const team = await Team.findById(teamId);

    if (!team) {
      return res
        ? res.status(404).json({ message: "Team not found" })
        : { success: false, message: "Team not found" };
    }

    const position = loggedInUser.position.toLowerCase();
    const teamMembers = team.members;

    if (position === "goalkeeper") {
      if (teamMembers.goalkeepers.length < 2) {
        teamMembers.goalkeepers.push(loggedInUser._id);
      } else {
        const errorMessage = "Exceeds goalkeeper roster limit";
        return res
          ? res.status(400).json({ message: errorMessage })
          : { success: false, message: errorMessage };
      }
    } else {
      if (teamMembers[`${position}s`].length < 7) {
        teamMembers[`${position}s`].push(loggedInUser._id);
      } else {
        const errorMessage = `Exceeds ${position} roster limit`;
        return res
          ? res.status(400).json({ message: errorMessage })
          : { success: false, message: errorMessage };
      }
    }

    await team.save();
    loggedInUser.teamId = teamId;
    await loggedInUser.save();

    return res
      ? res
          .status(200)
          .json({ message: "Player successfully added to the team" })
      : { success: true };
  } catch (error) {
    console.error(error);
    return res
      ? res
          .status(500)
          .json({ message: "Server error, please try again later" })
      : { success: false, message: "Server error" };
  }
};

export const removePlayerFromTeam = async () => {
  /*
   * User's teamId key has to be set to null
   * Team's position array has to eliminate the playersId
   * If the user was the captain the Team's captainId MUST change
   */
};
