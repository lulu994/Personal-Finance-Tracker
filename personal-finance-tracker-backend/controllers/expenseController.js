// Import necessary dependencies and models
const Expense = require('../models/Expense');

// Get all expenses for a user
exports.getAllExpenses = async (req, res) => {
  try {
    // Fetch all expenses from the database for the authenticated user
    const expenses = await Expense.find({ userId: req.user.userId });

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, category, date } = req.body;

    // Create a new expense object with the provided details and authenticated user ID
    const newExpense = new Expense({
      amount,
      category,
      date,
      userId: req.user.userId,
    });

    // Save the expense to the database
    await newExpense.save();

    res.status(201).json({ message: 'Expense added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an existing expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, date } = req.body;

    // Find the expense by ID and update its details
    await Expense.findByIdAndUpdate(id, { amount, category, date });

    res.status(200).json({ message: 'Expense updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete an existing expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the expense by ID and delete it
    await Expense.findByIdAndDelete(id);

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
