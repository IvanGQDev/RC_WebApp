import { useState } from "react";

export default function FormularioUsuario() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [edad, setEdad] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoUsuario = { nombre, correo, edad };

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      const data = await response.json();
      console.log("Usuario creado:", data);

      // Opcional: limpiar campos
      setNombre("");
      setCorreo("");
      setEdad("");
    } catch (error) {
      console.error("Error al enviar usuario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div>
        <label>Correo:</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <div>
        <label>Edad:</label>
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}