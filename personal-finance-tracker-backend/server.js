const express = require('express');
const connectDB = require('./db'); // Update the path as needed
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const app = express();

require('dotenv').config();
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/your-database-name'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Remove the following line, as it is no longer needed and is deprecated
  // useFindAndModify: false,
};

// Define mongoose models and schemas
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Sample route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the personal finance tracker backend!' });
});

// Register route
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Protected route example
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to your dashboard!' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
