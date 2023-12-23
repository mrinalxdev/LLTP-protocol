const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authService = "../services/authService";
const User = require("../models/User");

const secretKey = "abcLogin123";
const saltRounds = 10;

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authService.authenticateUser(username, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign(user.toJSON(), secretKey);
    res.json({ token, user: { username: user.username, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    //Validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username }).exec();
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ error: "Internal server connection" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.verifyToken = (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    res.json({ username: user.username, role: user.role });
  });
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
      return res
        .status(400)
        .json({ error: "Username and Password are required" });
    }
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(400).json({ error: "User not Found !" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();
    res.json({ message: "User Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
