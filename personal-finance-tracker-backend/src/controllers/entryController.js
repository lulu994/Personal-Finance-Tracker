const Entry = require('../models/Entry');

const addEntry = async (req, res) => {
  try {
    const { amount, category, type } = req.body;
    const userId = req.user.id; // Extracted from the authenticated user's token

    // Create a new entry
    const newEntry = new Entry({ user: userId, amount, category, type });
    await newEntry.save();

    res.status(201).json({ message: 'Entry added successfully', entry: newEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getEntries = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the authenticated user's token

    // Get all entries for the user
    const entries = await Entry.find({ user: userId }).sort({ date: -1 });

    res.status(200).json({ entries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { addEntry, getEntries };
