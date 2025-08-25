import React from "react";
import {
  Users,
  BarChart2,
  Clock,
  Smile,
  CheckCircle,
  Repeat,
} from "lucide-react";
// Cards de estadísticas generales
const StatsOverview = ({ stats }) => {
  const cards = [
    {
      title: "Total de Usuarios",
      icon: <Users className="text-blue-500" />,
      value: stats.totalUsuarios,
    },
    {
      title: "Prom. Puntaje",
      icon: <BarChart2 className="text-green-500" />,
      value: `${stats.promedioPuntaje.toFixed(1)} pts`,
    },
    {
      title: "Tiempo Promedio Global",
      icon: <Clock className="text-purple-500" />,
      value: `${stats.tiempoPromedioGlobal.toFixed(2)}s`,
    },
    {
      title: "Tasa de Aprobación",
      icon: <Smile className="text-yellow-500" />,
      value: `${stats.tasaAprobacion.toFixed(1)}%`,
    },
    {
      title: "Situaciones Procesadas",
      icon: <CheckCircle className="text-indigo-500" />,
      value: stats.totalSituaciones,
    },
    
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 border border-gray-100"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
            {card.icon}
          </div>
          <div>
            <p className="text-sm text-gray-500">{card.title}</p>
            <h3 className="text-xl font-bold text-gray-800">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
