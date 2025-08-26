// Clasificación de dificultad
const getDificultad = (index) => {
  if (index < 9) return "facil";
  if (index < 18) return "medio";
  return "dificil";
};

const avg = (arr) =>
  arr.length ? +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : 0;

// Detalles y estadísticas de la persona
export const calcularDetallesPersona = (person) => {
  if (!person) return null;

  const diasArray = Object.entries(person.dias || {}).map(([key, dia]) => ({
    ...dia,
    dia: key,
  }));

  const diasAprobados = diasArray.filter((d) => d.clasificacion === 1).length;

  const status =
    diasAprobados >= 2
      ? "Aprobado"
      : diasAprobados > 0
      ? "No aprobado"
      : "Sin procesar";

  const allSituaciones = diasArray.flatMap((d) =>
    d.tiempos.map((tiempo, idx) => ({
      tiempo,
      posicion:
        d.posiciones?.[
          `Position_${(idx % Object.keys(d.posiciones || {}).length) + 1}`
        ] || null,
      dificultad: getDificultad(idx),
    }))
  );

  const tiemposPorDificultad = { facil: [], medio: [], dificil: [] };
  let totalTiempos = 0;

  allSituaciones.forEach((s) => {
    tiemposPorDificultad[s.dificultad].push(s.tiempo);
    totalTiempos += s.tiempo;
  });

  const tiempos = {
    facil: avg(tiemposPorDificultad.facil),
    medio: avg(tiemposPorDificultad.medio),
    dificil: avg(tiemposPorDificultad.dificil),
    global: +(totalTiempos / allSituaciones.length).toFixed(2),
  };

  const mejorSituacion = allSituaciones.reduce(
    (min, current, idx) =>
      current.tiempo < min.tiempo ? { ...current, idx } : min,
    { tiempo: Infinity }
  );
  const peorSituacion = allSituaciones.reduce(
    (max, current, idx) =>
      current.tiempo > max.tiempo ? { ...current, idx } : max,
    { tiempo: -Infinity }
  );

  const mejor = {
    tiempo: mejorSituacion.tiempo?.toFixed(2),
    situacion: (mejorSituacion.idx % 27) + 1,
    dificultad: getDificultad(mejorSituacion.idx % 27),
  };

  const peor = {
    tiempo: peorSituacion.tiempo?.toFixed(2),
    situacion: (peorSituacion.idx % 27) + 1,
    dificultad: getDificultad(peorSituacion.idx % 27),
  };

  const puntajePromedio = avg(diasArray.map((d) => d.score));

  return {
    diasArray,
    status,
    tiempos,
    mejor,
    peor,
    puntajePromedio,
  };
};
