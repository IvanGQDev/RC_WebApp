import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

initializeApp({ projectId: "demo-project" }); 
const db = getFirestore();

db.settings({
  host: "127.0.0.1:8080",
  ssl: false
});
console.log("🔥 Conectado a Firestore Emulator");

app.get("/", (req, res) => {
  res.send("API funcionando en local 🚀");
});

app.get("/usuarios", async (req, res) => {
  try {
    const snapshot = await db.collection("usuarios").get();

    const usuarios = snapshot.docs.map(doc => {
      const data = doc.data();

      const { id, nombre, genero, ...dias } = data;

      return {
        id,
        nombre,
        genero,
        dias  
      };
    });

    res.json(usuarios);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    const data = req.body;
    const dia = data.dia; 
    const userId = data.id;

    if (!userId || !dia) {
      return res.status(400).json({ error: "Falta 'id' o 'dia' en la petición" });
    }

    const datosUsuario = {
      id: data.id,
      nombre: data.nombre,
      genero: data.genero
    };

    const datosDia = {
      score: data.score,
      tiempo_prom: data.tiempo_prom,
      grab_attempts: data.grab_attempts,
      num_posiciones_prom: data.num_posiciones_prom,
      tiempos: data.tiempos,
      posiciones: data.posiciones,
      resultado_final: data.resultado_final,
      prob_apto: data.prob_apto,
      clasificacion: data.clasificacion
    };

    const userRef = db.collection("usuarios").doc(userId);

    await userRef.set(datosUsuario, { merge: true }); 
    await userRef.set({ [dia]: datosDia }, { merge: true }); 

    res.json({ mensaje: `Usuario ${userId} actualizado en día ${dia}` });
  } catch (error) {
    console.error("Error guardando usuario:", error);
    res.status(500).json({ error: "Error guardando usuario" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));