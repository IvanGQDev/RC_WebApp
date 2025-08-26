import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getUsuarios = async () => {
  const res = await api.get("/usuarios");
  return res.data;
};

// Calcular estadísticas necesarias para Home
export const calcularEstadisticasHome = (usuarios) => {
  const usuariosCompletos = usuarios.filter(u => {
    const dias = Object.values(u.dias || {});
    return dias.length === 3;
  });

  const total = usuariosCompletos.length;
  let totalPuntaje = 0;
  let totalTiempo = 0;
  let totalClasificaciones = 0;
  let totalAprobadosUsuarios = 0;

  const resumenUsuarios = usuariosCompletos.map((u) => {
    const dias = Object.values(u.dias || {});

    const totalScore = dias.reduce((sum, d) => sum + (d.score || 0), 0);
    const totalTiempoUser = dias.reduce((sum, d) => sum + (d.tiempo_prom || 0), 0);

    const diasAprobados = dias.filter(d => d.clasificacion === 1).length;
    if (diasAprobados >= 2) totalAprobadosUsuarios++;

    totalPuntaje += totalScore;
    totalTiempo += totalTiempoUser;
    totalClasificaciones += dias.length;

    return {
      nombre: u.nombre,
      puntaje: totalScore,
      tiempoPromedio: dias.length ? totalTiempoUser / dias.length : 0,
    };
  });

  return {
    stats: {
      totalUsuarios: total,
      promedioPuntaje: totalPuntaje / total || 0,
      tiempoPromedio: totalTiempo / totalClasificaciones || 0,
      porcentajeAprobados: (totalAprobadosUsuarios / total) * 100 || 0,
    },
    topScore: [...resumenUsuarios].sort((a, b) => b.puntaje - a.puntaje).slice(0, 5),
    topTiempo: [...resumenUsuarios].sort((a, b) => a.tiempoPromedio - b.tiempoPromedio).slice(0, 5),
  };
};


// Datos para la vista de tabla
export const formatearUsuariosTabla = (usuarios) => {
  return usuarios.map((u) => {
    const dias = Object.values(u.dias || {});
    const puntos = dias.reduce((sum, d) => sum + (d.score || 0), 0);
    const diasAprobados = dias.filter((d) => d.clasificacion === 1).length;

    let status = "Sin procesar";
    if (diasAprobados >= 2) status = "Aprobado";
    else if (diasAprobados === 1 && dias.length === 3) status = "No aprobado";
    else if (dias.length === 3 && diasAprobados === 0) status = "No aprobado";
    else if (dias.length < 3) status = "Sin procesar";
    

    return {
      id: u.id,
      genero: u.genero || "Otro",
      nombres: u.nombre,
      apellidos: u.nombre,
      puntos,
      status,
      original: u,
    };
  });
};
