const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Inicializa Firebase para producción
admin.initializeApp({
  projectId: "conflikta-2ea2d",
});

// Conexión a Firestore en la nube
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

console.log("Servidor Express inicializado dentro de Firebase Functions");


app.get("/", (req, res) => {
  res.send(" API funcionando dentro de Firebase!");
});

// Obtener usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const snapshot = await db.collection("usuarios").get();
    const usuarios = snapshot.docs.map((doc) => {
      const data = doc.data();
      const {id, nombre, genero, ...dias} = data;
      return {id, nombre, genero, dias};
    });
    res.json(usuarios);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).json({error: "Error obteniendo usuarios"});
  }
});

// Agregar usuario
app.post("/usuarios", async (req, res) => {
  try {
    const data = req.body;
    const dia = data.dia;
    const userId = data.id;

    if (!userId || !dia) {
      return res.status(400).json({error: "Falta 'id' o 'dia' en la petición"});
    }

    const datosUsuario = {
      id: data.id,
      nombre: data.nombre,
      genero: data.genero,
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
      clasificacion: data.clasificacion,
    };

    const userRef = db.collection("usuarios").doc(userId);
    await userRef.set(datosUsuario, {merge: true});
    await userRef.set({[dia]: datosDia}, {merge: true});

    res.json({mensaje: `Usuario ${userId} actualizado en día ${dia}`});
  } catch (error) {
    console.error("Error guardando usuario:", error);
    res.status(500).json({error: "Error guardando usuario"});
  }
});

exports.api = functions.https.onRequest(app);
