import React, { useState, useEffect } from "react";

function Expense() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    return storedExpenses || [];
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && amount && date) {
      const newExpense = { description, amount: parseFloat(amount), date };

      if (editIndex !== null) {
        const updatedExpenses = expenses.map((expense, index) =>
          index === editIndex ? newExpense : expense
        );
        setExpenses(updatedExpenses);
        setEditIndex(null);
      } else {
        setExpenses([...expenses, newExpense]);
      }

      setDescription("");
      setAmount("");
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
  };

  const editExpense = (index) => {
    const updateExpense = expenses[index];
    setDescription(updateExpense.description);
    setAmount(updateExpense.amount.toString());
    setDate(updateExpense.date);
    setEditIndex(index);
  };

  const deleteExpense=(index)=>{
    // Ask for confirmation before deleting
    const isConfirmed=window.confirm('Are you sure you want to delete this expense?');
    if(isConfirmed){
      setExpenses(expenses.filter((_,i)=>i!==index));
      // Remove expense by index
    }
  }

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50 flex flex-col items-center py-10 pt-28">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md ">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Add Expense
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
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
            {editIndex !== null ? "Update Expense" : "Add Expense"}
          </button>
        </form>
      </div>

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
                    ${expense.amount.toFixed(2)} on{" "}
                    {new Date(expense.date).toISOString().split("T")[0]}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => editExpense(index)}
                    className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExpense(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {expenses.length === 0? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No expenses added yet.
          </p>
        ):(
        <div className="bg-white shadow-lg rounded-lg mt-10 p-4 text-right">
          <h3 className="text-lg font-bold text-gray-700">
            Total Expense: ${totalExpense.toFixed(2)}
          </h3>
        </div>)
        }
      </div>
    </div>
  );
}

export default Expense;
