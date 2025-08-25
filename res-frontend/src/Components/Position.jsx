import React from 'react';
import Plot from 'react-plotly.js';

const Position = ({ posiciones }) => {
  const x = posiciones.map(p => p.x);
  const y = posiciones.map(p => p.y);
  const z = posiciones.map(p => p.z);

  const inicio = posiciones[0];

  return (
    <div className="w-full h-96 mb-8">
      <Plot
        data={[
          // Conexion entre puntos
          {
            x, y, z,
            mode: 'lines+markers',
            type: 'scatter3d',
            name: 'Trayectoria',
            marker: {
              size: 5,
              color: 'rgba(66, 135, 245, 0.8)',
            },
            line: {
              color: 'rgba(66, 135, 245, 0.6)',
              width: 2,
            }
          },

          // Inicio
          {
            x: [inicio.x],
            y: [inicio.y],
            z: [inicio.z],
            mode: 'markers+text',
            type: 'scatter3d',
            name: 'Inicio',
            marker: {
              size: 8,
              color: 'green',
              symbol: 'circle',
            },
            text: ['Inicio'],
            textposition: 'top center'
          }
        ]}
        layout={{
          margin: { l: 0, r: 0, b: 0, t: 0 },
          scene: {
            xaxis: { title: 'X' },
            yaxis: { title: 'Y' },
            zaxis: { title: 'Z' },
          },
          showlegend: true
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Position;
