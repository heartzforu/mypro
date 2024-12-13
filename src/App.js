import React, { useEffect, useState } from "react";
import {  Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Expense from "./components/Expense";
import { Context } from "./components/CreateContext";
import Login from './components/Login'
import ResponsiveAppBar from "./components/AppBar";

function App() {
  const [expenses,setExpenses]=useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in on initial render
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      navigate('/expense');
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

  // Total Expense calculation
  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
  
  return (
    <div>
      <Context.Provider value={{isLoggedIn,totalExpense,setIsLoggedIn}}>
      <ResponsiveAppBar/>
      <div>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/expense" element={<Expense/>}/>
        </Routes>
      </div>
      </Context.Provider>
    </div>
  );
}

export default App;
