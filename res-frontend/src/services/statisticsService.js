export const calcularEstadisticasUsuarios = (usuarios) => {
  if (!usuarios || usuarios.length === 0) return null;

  const usuariosCompletos = usuarios.filter(u => Object.values(u.dias || {}).length === 3);

  const totalUsuarios = usuariosCompletos.length;
  let totalPuntaje = 0;
  let totalTiempo = 0;
  let totalSituaciones = 0;
  let totalAprobados = 0;

  const generoMap = {};
  const scoreRanges = {
    "0-500": 0,
    "501-1000": 0,
    "1001-2000": 0,
    "2001-3000": 0,
    "3001-4000": 0,
    "4001-5000": 0,
    "5001-6000": 0,
    "6001-7000": 0,
    "7001-8000": 0,
    "8000+": 0,
  };
  const situacionTiempos = {};

  const normalizeGenero = (g) => {
    if (!g || typeof g !== "string") return "Otro";
    return g.charAt(0).toUpperCase() + g.slice(1).toLowerCase();
  };

  const resumenUsuarios = usuariosCompletos.map((u) => {
    const dias = Object.values(u.dias);
    const puntaje = dias.reduce((sum, d) => sum + (d.score || 0), 0);
    const tiempoTotal = dias.reduce((sum, d) => sum + (d.tiempo_prom || 0), 0);
    const aproboDias = dias.filter((d) => d.clasificacion === 1).length;
    const totalDias = dias.length;

    totalPuntaje += puntaje;
    totalTiempo += tiempoTotal;
    totalSituaciones += totalDias;
    if (aproboDias >= 2) totalAprobados++;

    const genero = normalizeGenero(u.genero);
    if (!generoMap[genero]) generoMap[genero] = { aprobados: 0, total: 0, puntaje: 0, tiempo: 0 };

    generoMap[genero].total += 1;
    generoMap[genero].puntaje += puntaje;
    generoMap[genero].tiempo += totalDias ? tiempoTotal / totalDias : 0;
    if (aproboDias >= 2) generoMap[genero].aprobados += 1;

    if (puntaje <= 500) scoreRanges["0-500"]++;
    else if (puntaje <= 1000) scoreRanges["501-1000"]++;
    else if (puntaje <= 2000) scoreRanges["1001-2000"]++;
    else if (puntaje <= 3000) scoreRanges["2001-3000"]++;
    else if (puntaje <= 4000) scoreRanges["3001-4000"]++;
    else if (puntaje <= 5000) scoreRanges["4001-5000"]++;
    else if (puntaje <= 6000) scoreRanges["5001-6000"]++;
    else if (puntaje <= 7000) scoreRanges["6001-7000"]++;
    else if (puntaje <= 8000) scoreRanges["7001-8000"]++;
    else scoreRanges["8000+"]++;

    dias.forEach((d) => {
      d.tiempos.forEach((tiempo, idx) => {
        const situacion = idx + 1; 
        if (!situacionTiempos[situacion]) situacionTiempos[situacion] = [];
        situacionTiempos[situacion].push(tiempo);
      });
    });

    return {
      nombre: u.nombre,
      puntaje,
      tiempoPromedio: totalDias ? tiempoTotal / totalDias : 0,
    };
  });

  const avgTiemposSituacion = Object.entries(situacionTiempos).map(([situacion, tiempos]) => ({
    situacion: Number(situacion),
    tiempo: tiempos.reduce((a, b) => a + b, 0) / tiempos.length,
  }));

  const genderStatsArray = Object.entries(generoMap).map(([genero, stats]) => ({
    genero,
    aprobacion: stats.total ? (stats.aprobados / stats.total) * 100 : 0,
    tiempo: stats.total ? stats.tiempo / stats.total : 0,
    puntaje: stats.total ? stats.puntaje / stats.total : 0,
  }));

  const scoreDistArray = Object.entries(scoreRanges).map(([rango, cantidad]) => ({ rango, cantidad }));

  return {
    stats: {
      totalUsuarios,
      promedioPuntaje: totalPuntaje / totalUsuarios || 0,
      tiempoPromedioGlobal: totalTiempo / totalSituaciones || 0,
      tasaAprobacion: (totalAprobados / totalUsuarios) * 100 || 0,
      totalSituaciones,
    },
    genderStats: genderStatsArray,
    scoreDistribution: scoreDistArray,
    situationAvgTime: avgTiemposSituacion,
    topScore: resumenUsuarios.sort((a, b) => b.puntaje - a.puntaje).slice(0, 5),
    topTiempo: resumenUsuarios.sort((a, b) => a.tiempoPromedio - b.tiempoPromedio).slice(0, 5),
  };
};
