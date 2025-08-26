import React, { useEffect, useState } from "react";
import { getUsuarios, calcularEstadisticasHome } from "../services/userService";
import TopUsersScore from "./TopUsersScore";
import TopUsersTime from "./TopUsersTime";
import { Users, BarChart2, Clock, Smile } from "lucide-react";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [topScore, setTopScore] = useState([]);
  const [topTiempo, setTopTiempo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsuarios();
        const { stats, topScore, topTiempo } = calcularEstadisticasHome(data);
        setStats(stats);
        setTopScore(topScore);
        setTopTiempo(topTiempo);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-8 text-gray-600">Cargando...</p>;

  return (
    <div className="w-full h-full p-8 bg-gray-50 rounded-xl min-h-screen">
      {/* encabezado */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">¡Bienvenido al Panel General!</h1>
        <p className="text-gray-500 text-sm mt-1">Resumen de datos recolectados por los participantes</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Usuarios" icon={<Users className="text-blue-500" />} value={stats.totalUsuarios} />
        <Card title="Prom. Puntaje" icon={<BarChart2 className="text-green-500" />} value={`${stats.promedioPuntaje?.toFixed(1)} pts`} />
        <Card title="Tiempo Promedio" icon={<Clock className="text-purple-500" />} value={`${stats.tiempoPromedio?.toFixed(2)}s`} />
        <Card title="Aprobados" icon={<Smile className="text-yellow-500" />} value={`${stats.porcentajeAprobados?.toFixed(1)}%`} />
      </div>

      {/* Gráficos */}
      <div className="flex flex-col gap-4">
        <TopUsersScore title="Top 5 Usuarios por Puntaje" data={topScore} />
        <TopUsersTime data={topTiempo} />
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
