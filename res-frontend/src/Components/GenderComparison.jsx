import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const GenderComparison = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Comparativas por Género
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={8}>
          <XAxis dataKey="genero" />
          <YAxis />
          <Tooltip />
          <Legend />
          
          <Bar dataKey="aprobacion" fill="#34d399" name="Aprobación (%)">
            <LabelList dataKey="aprobacion" position="top" />
          </Bar>
          <Bar dataKey="puntaje" fill="#60a5fa" name="Puntaje Prom.">
            <LabelList dataKey="puntaje" position="top" />
          </Bar>
          <Bar dataKey="tiempo" fill="#818cf8" name="Tiempo Prom. (s)">
            <LabelList dataKey="tiempo" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderComparison;
