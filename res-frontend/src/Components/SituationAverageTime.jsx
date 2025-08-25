import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const SituationAverageTime = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Tiempo Promedio por Situación
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="situacion" />
          <YAxis label={{ value: "Segundos", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar
            dataKey="tiempo"
            fill="#f97319" 
            radius={[6, 6, 0, 0]}
            name="Tiempo promedio (s)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SituationAverageTime;
