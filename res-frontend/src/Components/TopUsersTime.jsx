import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TopUsersTime = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Usuarios por Tiempo Promedio</h2>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 40, right: 20 }}>
            <XAxis 
              type="number" 
              domain={['dataMin - 0.5', 'dataMax + 0.5']} 
              unit="s"
              tickFormatter={(value) => value.toFixed(4)} 
            />
            <YAxis 
              dataKey="nombre" 
              type="category" 
              tickFormatter={(nombre) => nombre.length > 13 ? nombre.slice(0, 13) + '…' : nombre} 
            />
            <Tooltip />
            <Bar 
              dataKey="tiempoPromedio" 
              fill="#3b82f6" 
              radius={[10, 10, 10, 10]} 
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default TopUsersTime;