// Backend básico para tu página de votaciones escolares
// Requiere Node.js y Express instalado

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta para guardar postulaciones de personero/contralor
app.post('/postular', (req, res) => {
    const nuevaPostulacion = req.body;

    // Guarda en archivo local (simulando base de datos)
    fs.readFile('postulaciones.json', 'utf8', (err, data) => {
        let postulaciones = [];
        if (!err && data) {
            postulaciones = JSON.parse(data);
        }

        postulaciones.push(nuevaPostulacion);

        fs.writeFile('postulaciones.json', JSON.stringify(postulaciones, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error guardando la postulación' });
            }
            res.status(200).json({ mensaje: 'Postulación guardada exitosamente' });
        });
    });
});

// Ruta para obtener postulaciones
app.get('/postulaciones', (req, res) => {
    fs.readFile('postulaciones.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ mensaje: 'No se pudo leer las postulaciones' });
        }
        res.status(200).json(JSON.parse(data));
    });
});

// Ruta para registrar votos
app.post('/votar', (req, res) => {
    const voto = req.body;

    fs.readFile('votos.json', 'utf8', (err, data) => {
        let votos = [];
        if (!err && data) {
            votos = JSON.parse(data);
        }

        votos.push(voto);

        fs.writeFile('votos.json', JSON.stringify(votos, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error guardando el voto' });
            }
            res.status(200).json({ mensaje: 'Voto registrado exitosamente' });
        });
    });
});

// Ruta para ver votos
app.get('/votos', (req, res) => {
    fs.readFile('votos.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ mensaje: 'No se pudo leer los votos' });
        }
        res.status(200).json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
