import React, { useState } from "react";

function Expense() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && amount && date) {
      const newExpense = { description, amount: parseFloat(amount), date };
      setExpenses([...expenses, newExpense]);
      setDescription("");
      setAmount("");
      setDate("");
    }
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-300 flex flex-col items-center py-10">
      {/* Form Section */}
      <div className="bg-blue shadow-lg rounded-lg p-8 w-full max-w-md mt-20">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Expense Tracker</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* Expense List Section */}
      <div className="mt-10 w-full max-w-2xl">
        {expenses.length > 0 && (
          <ul className="space-y-4">
            {expenses.map((expense, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    {expense.description}
                  </p>
                  <p className="text-gray-500">
                    ${expense.amount.toFixed(2)} on {" "}
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteExpense(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        {expenses.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10">No expenses added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Expense;
