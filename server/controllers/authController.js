import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, firstName, lastName, password, zipcode, position } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      zipcode,
      position,
    });
    await newUser.save();
    res.status(201).json({ message: "User added!" });
    console.log("User added!", newUser);
  } catch (error) {
    console.log("Could not add user :(");
    res.status(500).json({ error: "Error registering user: ", message: error });
  }
};
// Future note may need to change how I refresh the token
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No User Found" });
    }
    const passwordValidated = await bcrypt.compare(password, user.password);

    if (passwordValidated) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "User validated!",
        token,
      });
    } else {
      return res.status(401).json({ error: "Wrong Password" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error logging in user: ", message: error });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      const { email, password, ...userWithoutSensitiveData } = user.toObject();

      res
        .status(200)
        .json({ message: "User Found!", user: userWithoutSensitiveData });
    }
  } catch (error) {
    res.status(400).json({ message: "Could not find user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (allUsers.length > 0) {
      return res
        .status(200)
        .json({ message: "Retrieved All Users", users: allUsers });
    }
  } catch (error) {
    res.status(400).json({ message: "Could not get all users" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, zipcode, position, teamId } = req.body;
    const updatedFields = { firstName, lastName, zipcode, position, teamId };

    // May need to use bcrypt later for password hashing
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updatedFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
