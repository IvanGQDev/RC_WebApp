import React from "react";
import StatsOverview from "./StatsOverview";
import GenderComparison from "./GenderComparison";
import ScoreDistribution from "./ScoreDistribution";
import SituationAverageTime from "./SituationAverageTime";
import TopUsersScore from "./TopUsersScore";
import TopUsersTime from "./TopUsersTime";

const topUsuarios = [
  { nombre: "Luis", puntaje: 1992 },
  { nombre: "Alex", puntaje: 1120 },
  { nombre: "Ana", puntaje: 1023 },
  { nombre: "Omar", puntaje: 840 },
  { nombre: "Sofía", puntaje: 773 },
];

const topUsuariosPorTiempo = [
    { nombre: "Luis", tiempoPromedio: 1.92 },
    { nombre: "Ana", tiempoPromedio: 2.15 },
    { nombre: "Alex", tiempoPromedio: 2.40 },
    { nombre: "Omar", tiempoPromedio: 2.95 },
    { nombre: "Sofía", tiempoPromedio: 3.12 },
];

const StatisticsPage = () => {
  const statsMock = {
    totalUsuarios: 35,
    promedioPuntaje: 880.4,
    tiempoPromedioGlobal: 3.24,
    tasaAprobacion: 68.5,
    totalSituaciones: 945,
  };

  const genderStatsMock = [
    {
        genero: "Mujeres",
        aprobacion: 74,
        tiempo: 3.1,
        puntaje: 895,
    },
    {
        genero: "Hombres",
        aprobacion: 65,
        tiempo: 3.6,
        puntaje: 870,
    },
  ];

  const scoreDistributionMock = [
    { rango: "0–100", cantidad: 3 },
    { rango: "101–200", cantidad: 6 },
    { rango: "201–300", cantidad: 8 },
    { rango: "301–400", cantidad: 10 },
    { rango: "401–500", cantidad: 5 },
    { rango: "501+", cantidad: 3 },
];

    const situationAvgTimeMock = Array.from({ length: 27 }, (_, i) => ({
      situacion: i + 1,
      tiempo: +(Math.random() * 10).toFixed(2),
    }));

  return (
    <div className="w-full h-full p-8 bg-gray-50 rounded-xl min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Estadísticas Generales</h1>
        <p className="text-gray-500 text-sm mt-1">Vista detallada del comportamiento de los participantes</p>
      </div>

      <StatsOverview stats={statsMock} />
      <GenderComparison data={genderStatsMock} />
      <ScoreDistribution data={scoreDistributionMock} />
      <SituationAverageTime data={situationAvgTimeMock} />
      <div className="flex flex-col  gap-8">
        <TopUsersScore title="Top 5 Usuarios por Puntaje" data={topUsuarios} />
        <div className="mb-8">
            <TopUsersTime data={topUsuariosPorTiempo} />
        </div>
     </div>
    </div>
  );
};

export default StatisticsPage;
