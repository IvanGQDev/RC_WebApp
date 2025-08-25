import React from "react";
import Position from "./Position";

import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";

const DayResults = ({ dayNumber, situaciones, puntaje, intentos }) => {
  // Test data
  const tiempoData = situaciones.map((s, idx) => ({
    situacion: `#${idx + 1}`,
    tiempo: s.tiempo,
  }));

  const summaryData = [
    { name: "Puntaje", value: puntaje },
    { name: "Intentos de agarre", value: intentos },
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Resultados: Día {dayNumber}</h2>

      {/* Gráfico de tiempo */}
      <div className="w-full h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={tiempoData} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="situacion" 
              label={{ value: "Situación #", position: "insideBottom", dy: 10 }} 
            />
            <YAxis 
              domain={[0, 20]} 
              label={{ value: "Tiempo (s)", angle: -90, position: "insideLeft", dx: 0 }} 
            />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="tiempo" 
              stroke="#8884d8" 
              strokeWidth={2} 
              dot={{ r: 3 }} 
              activeDot={{ r: 5 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de puntos y intentos */}
      <div className="w-full h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={summaryData} layout="vertical" margin={{ top: 10, right: 20, bottom: 10, left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de posiciones 3D */}
      <Position posiciones={situaciones.map(s => s.posicion)} />

    </div>
  );
};

export default DayResults;
