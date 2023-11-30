import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  // State for transaction history data
  const [transactionHistory, setTransactionHistory] = useState([]);

  // Fetch transaction history data from the backend
  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        // Replace 'YOUR_BACKEND_API_ENDPOINT/transactions/history' with the actual endpoint
        const response = await axios.get('YOUR_BACKEND_API_ENDPOINT/transactions/history');

        // Update state with fetched data
        setTransactionHistory(response.data);
      } catch (error) {
        console.error('Error fetching transaction history:', error.message);
        // Handle errors here (display error messages, etc.)
      }
    };

    fetchTransactionHistory();
  }, []); // Run this effect only once when the component mounts

  return (
    <div>
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactionHistory.map((transaction) => (
            <tr key={transaction.id}>
              <td>${transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.type}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
