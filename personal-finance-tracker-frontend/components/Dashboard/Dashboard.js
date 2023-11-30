import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalSavings: 0,
    // Add more data as needed
  });

  // Fetch dashboard data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'YOUR_BACKEND_API_ENDPOINT/dashboard' with the actual endpoint
        const response = await axios.get('YOUR_BACKEND_API_ENDPOINT/dashboard');

        // Update state with fetched data
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error.message);
        // Handle errors here (display error messages, etc.)
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Total Income: ${dashboardData.totalIncome}</h3>
        <h3>Total Expenses: ${dashboardData.totalExpenses}</h3>
        <h3>Total Savings: ${dashboardData.totalSavings}</h3>
        {/* Add more data as needed */}
      </div>
      {/* Add charts and other components to visualize data */}
    </div>
  );
};

export default Dashboard;
