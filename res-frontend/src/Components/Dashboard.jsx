import React from "react";

const Dashboard = ({ setIsLoggedIn }) => {
    
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-96 text-center">
        <h2 className="text-xl font-bold mb-4">Bienvenido al Dashboard 🎉</h2>
        <p className="mb-4">Tu sesión está activa.</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
