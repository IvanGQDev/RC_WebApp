import { useEffect, useState } from "react";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error cargando usuarios:", err));
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            <strong>{usuario.nombre}</strong> — {usuario.correo} — {usuario.edad} años
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaUsuarios;