const Budget = require('../models/Budget');

// Set spending limits for different categories
exports.setBudgetLimits = async (req, res) => {
  try {
    // Create or update budget limits based on request body
    const { category, limit } = req.body;
    
    await Budget.findOneAndUpdate({ category }, { limit }, { upsert: true });

    res.json({ message: 'Budget limits set successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while setting budget limits' });
  }
};

// Get budget adherence for different categories
exports.getBudgetAdherence = async (req, res) => {
  try {
    // Calculate and return budget adherence for each category
    
    // Example implementation:
    
    const budgets = await Budget.find();
    
    const adherenceData = budgets.map((budget) => ({
      category: budget.category,
      limit: budget.limit,
      actualSpending: calculateActualSpendingForCategory(budget.category),
      adherence: calculateBudgetAdherence(budget.limit, calculateActualSpendingForCategory(budget.category))
    }));
    
    res.json(adherenceData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while getting budget adherence' });
  }
};
