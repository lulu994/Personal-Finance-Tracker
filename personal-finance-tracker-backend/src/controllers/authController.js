const User = require('../models/User');
const authUtils = require('../utils/authUtils');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate and send JWT token
    const token = authUtils.generateToken({ id: newUser._id });
    res.status(201).json({ token, user: { id: newUser._id, username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate and send JWT token
    const token = authUtils.generateToken({ id: user._id });
    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { register, login };
