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
  Info
} from "lucide-react";

// Niveles de dificultad
const getDificultad = (index) => {
  if (index < 9) return "facil";
  if (index < 18) return "medio";
  return "dificil";
};

const PersonDetail = ({ person, onBack }) => {
  if (!person) return null;

  // Test data
  const dias = Array.from({ length: 3 }, () => ({
    situaciones: Array.from({ length: 27 }, (_, idx) => ({
      tiempo: +(Math.random() * 4 + 1).toFixed(2),
      posicion: {
        x: +(Math.random() * 10).toFixed(2),
        y: +(Math.random() * 10).toFixed(2),
        z: +(Math.random() * 10).toFixed(2),
      },
    })),
    puntaje: Math.floor(Math.random() * 200 + 300), // 300 a 500
    intentos: Math.floor(Math.random() * 5 + 3), // 3 a 7 intentos
  }));

  // Calculo de estadisticas generales
  const allSituaciones = dias.flatMap((d) => d.situaciones);
  const tiemposPorDificultad = { facil: [], medio: [], dificil: [] };
  let totalTiempos = 0;

  allSituaciones.forEach((s, idx) => {
    const dificultad = getDificultad(idx % 27);
    tiemposPorDificultad[dificultad].push(s.tiempo);
    totalTiempos += s.tiempo;
  });

  const tiempos = {
    facil: avg(tiemposPorDificultad.facil),
    medio: avg(tiemposPorDificultad.medio),
    dificil: avg(tiemposPorDificultad.dificil),
    global: +(totalTiempos / allSituaciones.length).toFixed(2)
  };

  const mejorSituacion = allSituaciones.reduce((min, current, idx) =>
    current.tiempo < min.tiempo ? { ...current, idx } : min,
    { tiempo: Infinity }
  );
  const peorSituacion = allSituaciones.reduce((max, current, idx) =>
    current.tiempo > max.tiempo ? { ...current, idx } : max,
    { tiempo: -Infinity }
  );

  const mejor = {
    tiempo: mejorSituacion.tiempo.toFixed(2),
    situacion: (mejorSituacion.idx % 27) + 1,
    dificultad: getDificultad(mejorSituacion.idx % 27)
  };

  const peor = {
    tiempo: peorSituacion.tiempo.toFixed(2),
    situacion: (peorSituacion.idx % 27) + 1,
    dificultad: getDificultad(peorSituacion.idx % 27)
  };

  const puntajePromedio =
    dias.reduce((acc, d) => acc + d.puntaje, 0) / dias.length;

  function avg(arr) {
    return arr.length ? +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : 0;
  }

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
            {person.nombres} {person.apellidos}
          </h2>
          <p className="text-sm text-gray-500">Detalles de usuario</p>
        </div>
      </div>

      {/* Informacion personal */}
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-600 mb-3">
        <Info className="w-5 h-5 text-blue-600" />
        Información personal
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cards con informacion personal*/}
        <InfoCard icon={User} label="Género" value={person.genero} bg="blue" />
        <InfoCard icon={IdCard} label="Nombres" value={person.nombres} bg="purple" />
        <InfoCard icon={FileText} label="Apellidos" value={person.apellidos} bg="pink" />
        <InfoCard icon={BarChart2} label="Puntos Totales" value={person.puntos} bg="green" />
        <InfoCard icon={BadgeCheck} label="Resultado" value={person.status} bg="indigo" />
      </div>

      {/* Resultados por dia */}
      {dias.map((dia, idx) => (
        <DayResults
          key={idx}
          dayNumber={idx + 1}
          situaciones={dia.situaciones}
          puntaje={dia.puntaje}
          intentos={dia.intentos}
        />
      ))}

      {/* Estadisticas generales */}
      <Statistics
        tiempos={tiempos}
        mejor={mejor}
        peor={peor}
        puntajePromedio={puntajePromedio}
      />
    </div>
  );
};

// Card
const InfoCard = ({ icon: Icon, label, value, bg }) => (
  <div className={`flex items-center p-4 bg-${bg}-50 border border-${bg}-200 rounded-lg shadow-sm`}>
    <Icon className={`w-6 h-6 text-${bg}-500 mr-3`} />
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default PersonDetail;
