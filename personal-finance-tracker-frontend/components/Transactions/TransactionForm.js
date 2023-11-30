import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
  // State for form fields
  const [transactionData, setTransactionData] = useState({
    amount: '',
    category: '',
    type: '', // 'income' or 'expense'
    date: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleAddTransaction = async (e) => {
    e.preventDefault();

    try {
      // Replace 'YOUR_BACKEND_API_ENDPOINT/transactions' with the actual endpoint
      const response = await axios.post('YOUR_BACKEND_API_ENDPOINT/transactions', transactionData);

      // Handle success (you may want to handle errors differently)
      console.log('Transaction added successfully:', response.data);

      // Clear form fields after successful submission
      setTransactionData({
        amount: '',
        category: '',
        type: '',
        date: '',
      });
    } catch (error) {
      console.error('Transaction addition error:', error.message);
      // Handle transaction addition errors here (display error messages, etc.)
    }
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleAddTransaction}>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={transactionData.amount}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={transactionData.category}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Type:
          <select name="type" value={transactionData.type} onChange={handleInputChange} required>
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={transactionData.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
