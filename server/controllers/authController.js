import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
// Future note may need to change how I refresh the token
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: "No User Found" });
    }
    const passwordValidated = await bcrypt.compare(password, user.password);

    if (passwordValidated) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const { password: _, ...userWithoutPassword } = user.toObject();

      res.status(200).json({
        message: "User validated!",
        token,
        user: userWithoutPassword,
      });
    } else {
      res.status(401).json({ error: "Wrong Password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in user: ", message: error });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({ message: "User Found!", user });
    }
  } catch (error) {
    res.status(400).json({ message: "Could not find user" });
  }
};
