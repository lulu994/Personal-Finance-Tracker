// Import necessary dependencies and models
const Income = require('../models/Income');

// Get all incomes for a user
exports.getAllIncomes = async (req, res) => {
  try {
    // Fetch all incomes from the database for the authenticated user
    const incomes = await Income.find({ userId: req.user.userId });

    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new income
exports.addIncome = async (req, res) => {
  try {
    const { amount, category, date } = req.body;

    // Create a new income object with the provided details and authenticated user ID
    const newIncome = new Income({
      amount,
      category,
      date,
      userId: req.user.userId,
    });

    // Save the income to the database
    await newIncome.save();

    res.status(201).json({ message: 'Income added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an existing income
exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, date } = req.body;

    // Find the income by ID and update its details
    await Income.findByIdAndUpdate(id, { amount, category, date });

    res.status(200).json({ message: 'Income updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete an existing income
exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the income by ID and delete it
    await Income.findByIdAndDelete(id);

    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
