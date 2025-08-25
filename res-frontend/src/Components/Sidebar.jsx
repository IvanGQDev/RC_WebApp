import React from "react";
import { Home, List, BarChart2, LogOut } from "lucide-react";

const Sidebar = ({ setIsLoggedIn, active, setActive }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const menuItems = [
    { id: "inicio", label: "Inicio", icon: <Home size={22} /> },
    { id: "lista", label: "Lista", icon: <List size={22} /> },
    { id: "estadisticas", label: "Estadísticas", icon: <BarChart2 size={22} /> },
  ];

  return (
    <div className="h-screen w-38 bg-gray-900 text-white flex flex-col transition-all duration-300">
      {/* Menu */}
      <div className="flex-1 flex flex-col mt-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
              ${active === item.id ? "bg-gray-700" : "hover:bg-gray-800"}`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Boton para cerrar sesion */}
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-1 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <LogOut size={22} className="text-red-500 flex-shrink-0" />
          <span className="text-sm font-medium">Salir</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
