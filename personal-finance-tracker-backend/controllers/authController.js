// Import necessary dependencies and models
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
     if (!isPasswordValid) {
       return res.status(401).json({ message: 'Invalid credentials' });
     }

     // Generate JWT token for authentication
     const token = jwt.sign(
       { userId: user._id },
       process.env.JWT_SECRET,
       { expiresIn: '1h' }
     );

     res.status(200).json({ token });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Server Error' });
   }
};

// Logout a user
exports.logoutUser = async (req, res) => {
  try {
    // Perform any necessary logout operations
    // For example, you can invalidate the JWT token

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
