import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ---------------- Firebase ----------------
initializeApp({ projectId: "demo-project" }); // ID ficticio para el emulador
const db = getFirestore();

db.settings({
  host: "127.0.0.1:8080",
  ssl: false
});
console.log("🔥 Conectado a Firestore Emulator");

// ---------------- Rutas de prueba ----------------
app.get("/", (req, res) => {
  res.send("API funcionando en local 🚀");
});

app.get("/usuarios", async (req, res) => {
  const snapshot = await db.collection("usuarios").get();
  const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(usuarios);
});

app.post("/usuarios", async (req, res) => {
  const nuevoUsuario = req.body;
  const docRef = await db.collection("usuarios").add(nuevoUsuario);
  res.json({ id: docRef.id, ...nuevoUsuario });
});

// ---------------- Servidor ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));