import React from "react";
import TopUsersTime from "./TopUsersTime";
import TopUsersScore from "./TopUsersScore";
import {
  Users,
  BarChart2,
  Clock,
  Gauge,
  Smile,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Test
const topUsuarios = [
  { nombre: "Luis", puntaje: 1992 },
  { nombre: "Alex", puntaje: 1120 },
  { nombre: "Ana", puntaje: 1023 },
  { nombre: "Omar", puntaje: 840 },
  { nombre: "Sofía", puntaje: 773 },
];

const stats = {
  totalUsuarios: 35,
  promedioPuntaje: 880.4,
  tiempoPromedio: 3.24,
  porcentajeAprobados: 68.5,
};

const topUsuariosPorTiempo = [
    { nombre: "Luis", tiempoPromedio: 1.92 },
    { nombre: "Ana", tiempoPromedio: 2.15 },
    { nombre: "Alex", tiempoPromedio: 2.40 },
    { nombre: "Omar", tiempoPromedio: 2.95 },
    { nombre: "Sofía", tiempoPromedio: 3.12 },
];


const Home = () => {
    
  return (
    <div className="w-full h-full p-8 bg-gray-50 rounded-xl">
      {/* Título */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">¡Bienvenido al Panel General!</h1>
        <p className="text-gray-500 text-sm mt-1">Resumen de datos recolectados por los participantes</p>
      </div>

      {/* Cards de estadisticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Usuarios" icon={<Users className="text-blue-500" />} value={stats.totalUsuarios} />
        <Card title="Prom. Puntaje" icon={<BarChart2 className="text-green-500" />} value={`${stats.promedioPuntaje.toFixed(1)} pts`} />
        <Card title="Tiempo Promedio" icon={<Clock className="text-purple-500" />} value={`${stats.tiempoPromedio.toFixed(2)}s`} />
        <Card title="Aprobados" icon={<Smile className="text-yellow-500" />} value={`${stats.porcentajeAprobados.toFixed(1)}%`} />
      </div>

      {/* Gráficos */}
      <div className="flex flex-col  gap-1">
        <TopUsersScore title="Top 5 Usuarios por Puntaje" data={topUsuarios} />
        <TopUsersTime data={topUsuariosPorTiempo} />
      </div>
    </div>
    
  );
};

const Card = ({ title, icon, value }) => (
  <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 border border-gray-100">
    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

export default Home;
