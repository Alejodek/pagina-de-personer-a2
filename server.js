const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('base_datos.db');

app.use(cors());
app.use(bodyParser.json());
app.use(require("cors")());

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS candidatos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        email TEXT UNIQUE,
        foto TEXT,
        cargo TEXT,
        propuestas TEXT,
        total_votos INTEGER DEFAULT 0
    )
    `);
});

app.post('/postular', (req, res) => {
    const { nombre, email, foto, cargo, propuestas } = req.body;

    const stmt = db.prepare(`INSERT INTO candidatos (nombre, email, foto, cargo, propuestas)VALUES (?, ?, ?, ?, ?)`);

stmt.run([nombre, email, foto, cargo, propuestas], function (err) {
    if (err) {
        return res.status(400).json({ mensaje: "⚠️ Ya existe una postulación con ese correo." });
    }
    res.json({ mensaje: "✅ Postulación guardada exitosamente." });
    });
});

app.get('/candidatos', (req, res) => {
  db.all("SELECT * FROM candidatos", [], (err, rows) => {
    if (err) return res.status(500).json({ mensaje: "Error al obtener candidatos" });
    res.json(rows);
});
});


app.post('/votar', (req, res) => {
    const { candidato } = req.body;

const stmt = db.prepare(`
    UPDATE candidatos
    SET total_votos = total_votos + 1
    WHERE nombre = ?`);

stmt.run(candidato, function (err) {
    if (err || this.changes === 0) {
        return res.status(400).json({ mensaje: "❌ Error al votar. Candidato no encontrado." });
    }
    res.json({ mensaje: `✅ Voto registrado para ${candidato}` });
    });
});

app.listen(3000, () => {
    console.log("✅ Conectado a SQLite (base_datos.db)");
    console.log("🚀 Servidor escuchando en http://localhost:3000");
});