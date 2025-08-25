import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TopUsersScore = ({ title, data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="puntaje" fill="#3b82f6" radius={[6, 6, 0, 0] } />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopUsersScore;
