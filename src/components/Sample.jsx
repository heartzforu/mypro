import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import ExpenseTracker from './components/ExpenseTheme';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import './components/style.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in on initial render
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      navigate('/expenses');
    }
  }, [navigate]);

  // Load expenses from localStorage when logged in
  useEffect(() => {
    if (isLoggedIn) {
      const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
      if (storedExpenses) {
        setExpenses(storedExpenses);
      }
    }
  }, [isLoggedIn]);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses, isLoggedIn]);

  // Logout function
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false); // Update state
    navigate('/login'); // Redirect to login page
  };

  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div>
      <Routes>
        {/* For non-logged-in users */}
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            
          </>
        ) : (
          <>
            {/* For logged-in users */}
            <Route
              path="/expenses"
              element={
                <>
                  <h1>Expense Tracker</h1>
                  <ExpenseTracker expenses={expenses} setExpenses={setExpenses} />
                  <h2>Total Expense: ${totalExpense.toFixed(2)}</h2>
                  <button onClick={handleLogout}>Logout</button>
                </>
              }
            />
          </>
        )}
        {/* Fallback route for invalid paths */}
        <Route path="*" element={<div>Please <Link to="/login">Login</Link> first.</div>} />
      </Routes>
    </div>
  );
}

export default App;
