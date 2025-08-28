import React from "react";
import DayResults from "./DayResults";
import Statistics from "./Statistics";
import {
  ArrowLeft,
  User,
  BadgeCheck,
  IdCard,
  FileText,
  BarChart2,
  Info,
} from "lucide-react";

import { calcularDetallesPersona } from "../services/personService";

const PersonDetail = ({ person, onBack }) => {
  if (!person) return null;

  const { diasArray, status, tiempos, mejor, peor, puntajePromedio } =
    calcularDetallesPersona(person);

  return (
    <div className="w-full h-full p-8 bg-white rounded-xl shadow-lg">
      {/* Encabezado */}
      <div className="flex items-center gap-4 border-b pb-6 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          title="Volver"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">
            {person.nombre} {person.nombre}
          </h2>
          <p className="text-sm text-gray-500">Detalles de usuario</p>
        </div>
      </div>

      {/* Información personal */}
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-600 mb-3">
        <Info className="w-5 h-5 text-blue-600" />
        Información personal
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard icon={User} label="Género" value={person.genero} bg="blue" />
        <InfoCard icon={IdCard} label="Nombre" value={person.nombre} bg="purple" />
        <InfoCard icon={FileText} label="ID" value={person.id} bg="yellow" />
        <InfoCard
          icon={BarChart2}
          label="Puntos Totales"
          value={diasArray.reduce((acc, d) => acc + (d.score || 0), 0)}
          bg="green"
        />
        <InfoCard icon={BadgeCheck} label="Resultado" value={status} bg="indigo" />
      </div>

      {/* Resultados por día */}
      {diasArray.map((dia, idx) => (
        <DayResults
          key={idx}
          dayNumber={idx + 1}
          situaciones={dia.tiempos.map((t, i) => ({
            tiempo: t,
            posicion:
              dia.posiciones?.[
                `Position_${(i % Object.keys(dia.posiciones || {}).length) + 1}`
              ] || null,
          }))}
          puntaje={dia.score}
          intentos={dia.grab_attempts}
        />
      ))}

      {/* Estadísticas generales */}
      <Statistics
        tiempos={tiempos}
        mejor={mejor}
        peor={peor}
        puntajePromedio={puntajePromedio}
      />
    </div>
  );
};


const InfoCard = ({ icon: Icon, label, value, bg }) => (
  <div
    className={`flex items-center p-4 bg-${bg}-50 border border-${bg}-200 rounded-lg shadow-sm`}
  >
    <Icon className={`w-6 h-6 text-${bg}-500 mr-3`} />
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default PersonDetail;
