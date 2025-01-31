import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
    },
    wins: {
      type: Number,
      default: 0,
    },
    losses: {
      type: Number,
      default: 0,
    },
    matchesPlayed: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    captainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    matches: {
      upcoming: [{ type: mongoose.Schema.Types.ObjectId, ref: "Matches" }],
      history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Matches" }],
    },
    members: {
      goalkeepers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        validate: {
          validator: (val) => val.length <= 2,
          message: "Goalkeepers array cannot exceed 2 members",
        },
      },
      defenders: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        validate: {
          validator: (val) => val.length <= 7,
          message: "Goalkeepers array cannot exceed 7 members",
        },
      },
      midfielders: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        validate: {
          validator: (val) => val.length <= 7,
          message: "Midfielders array cannot exceed 7 members",
        },
      },
      forwards: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        validate: {
          validator: (val) => val.length <= 7,
          message: "Midfielders array cannot exceed 7 members",
        },
      },
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;
