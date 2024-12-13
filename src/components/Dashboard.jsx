import React from "react";

function Dashboard() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
    >
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard!</h1>
        <p className="text-lg text-gray-600">
          Track and manage your expenses efficiently.
        </p>
        <a
              href="/expense"
              className="text-blue-700 text-xl font-bold hover:text-blue-300 transition"
            >
              Add Expense Here
            </a>
      </div>
    </div>
  );
}

export default Dashboard;
