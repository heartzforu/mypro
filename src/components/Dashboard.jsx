import React from "react";

function Dashboard() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://www.freepik.com/free-photo/close-up-collected-coins-glass-jar-table_3063771.htm#fromView=search&page=1&position=7&uuid=f180e37e-1f1f-4877-898e-0c32271990a1')",
      }}
    >
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard!</h1>
        <p className="text-lg text-gray-600">
          Track and manage your expenses efficiently.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
