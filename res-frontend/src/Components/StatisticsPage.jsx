import React, { useEffect, useState } from "react";
import axios from "axios";
import StatsOverview from "./StatsOverview";
import GenderComparison from "./GenderComparison";
import ScoreDistribution from "./ScoreDistribution";
import SituationAverageTime from "./SituationAverageTime";
import TopUsersScore from "./TopUsersScore";
import TopUsersTime from "./TopUsersTime";
import { calcularEstadisticasUsuarios } from "../services/statisticsService";

const StatisticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/usuarios");
        const statsData = calcularEstadisticasUsuarios(res.data);
        setData(statsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-8 text-gray-600">Cargando...</p>;
  if (!data) return <p className="p-8 text-red-500">No hay datos para mostrar</p>;

  return (
    <div className="w-full h-full p-8 bg-gray-50 rounded-xl min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Estadísticas Generales</h1>
        <p className="text-gray-500 text-sm mt-1">Vista detallada del comportamiento de los participantes</p>
      </div>

      <StatsOverview stats={data.stats} />
      <GenderComparison data={data.genderStats} />
      <ScoreDistribution data={data.scoreDistribution} />
      <SituationAverageTime data={data.situationAvgTime} />
      <div className="flex flex-col gap-8">
        <TopUsersScore title="Top 5 Usuarios por Puntaje" data={data.topScore} />
        <div className="mb-8">
          <TopUsersTime data={data.topTiempo} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
