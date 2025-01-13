import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User added!" });
    console.log("User added!", newUser);
  } catch (error) {
    console.log("Could not add user :(");
    res.status(500).json({ error: "Error registering user: ", message: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "No User Found" });
    } else {
      const passwordValidated = await bcrypt.compare(password, user.password);
      if (passwordValidated) {
        res.status(200).json({ message: "User Validated!" });
      } else {
        res.status(401).json({ error: "Wrong Password" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in user: ", message: error });
  }
};
