import React from "react";
import { Clock, Flame, Turtle, Star } from "lucide-react";

const Statistics = ({ tiempos, mejor, peor, puntajePromedio }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
      
      {/* Tiempos promedio por dificultad */}
      <div className="bg-blue-50 p-5 rounded-xl shadow-md border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="text-blue-500 w-6 h-6" />
          <h3 className="text-lg font-semibold text-blue-700">Tiempos Promedio</h3>
        </div>
        <div className="space-y-1 ml-1">
          <p><span className="font-medium text-gray-600">Fácil:</span> <span className="text-gray-800 font-semibold">{tiempos.facil.toFixed(2)}s</span></p>
          <p><span className="font-medium text-gray-600">Medio:</span> <span className="text-gray-800 font-semibold">{tiempos.medio.toFixed(2)}s</span></p>
          <p><span className="font-medium text-gray-600">Difícil:</span> <span className="text-gray-800 font-semibold">{tiempos.dificil.toFixed(2)}s</span></p>
          <p><span className="font-medium text-gray-600">Global:</span> <span className="text-gray-800 font-semibold">{tiempos.global.toFixed(2)}s</span></p>
        </div>
      </div>

      {/* Mejor tiempo */}
      <div className="bg-green-50 p-5 rounded-xl shadow-md border border-green-100">
        <div className="flex items-center gap-3 mb-4">
          <Flame className="text-green-500 w-6 h-6" />
          <h3 className="text-lg font-semibold text-green-700">Mejor Tiempo</h3>
        </div>
        <p className="text-gray-800 text-base ml-1">
          <span className="font-semibold">{mejor.tiempo}s</span> en situación{" "}
          <span className="font-semibold">#{mejor.situacion}</span>{" "}
          <span className="text-sm text-gray-600">({mejor.dificultad})</span>
        </p>
      </div>

      {/* Peor tiempo */}
      <div className="bg-red-50 p-5 rounded-xl shadow-md border border-red-100">
        <div className="flex items-center gap-3 mb-4">
          <Turtle className="text-red-500 w-6 h-6" />
          <h3 className="text-lg font-semibold text-red-700">Peor Tiempo</h3>
        </div>
        <p className="text-gray-800 text-base ml-1">
          <span className="font-semibold">{peor.tiempo}s</span> en situación{" "}
          <span className="font-semibold">#{peor.situacion}</span>{" "}
          <span className="text-sm text-gray-600">({peor.dificultad})</span>
        </p>
      </div>

      {/* Puntaje promedio */}
      <div className="bg-purple-50 p-5 rounded-xl shadow-md border border-purple-100 md:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-3 mb-4">
          <Star className="text-purple-500 w-6 h-6" />
          <h3 className="text-lg font-semibold text-purple-700">Puntaje Promedio</h3>
        </div>
        <p className="text-3xl font-bold text-gray-800 ml-1">{puntajePromedio.toFixed(1)}</p>
      </div>

    </div>
  );
};

export default Statistics;
