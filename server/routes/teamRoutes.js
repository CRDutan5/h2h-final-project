import { Router } from "express";
import {
  addTeamPlayer,
  createTeam,
  getAllTeams,
  getTeamById,
} from "../controllers/teamController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const teamRouter = Router();

// Creates the team
teamRouter.post("/", authenticateToken, createTeam);
// Grab team info by id
teamRouter.get("/:id", getTeamById);
// Gets all the teams
teamRouter.get("/", getAllTeams);
// Add player to team
teamRouter.post("/:id/members", authenticateToken, addTeamPlayer);

export default teamRouter;
