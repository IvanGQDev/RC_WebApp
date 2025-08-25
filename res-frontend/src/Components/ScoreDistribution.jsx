import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ScoreDistribution = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Distribución de Puntajes
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rango" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="cantidad"
            stroke="#3b82f6"
            fill="#93c5fd"
            name="Usuarios"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreDistribution;
