const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lista_tareas'
});

app.post('/tareas', (req, res) => {
    console.log(req.body);
    
    const { text } = req.body;
    const fecha = new Date();
    const id = Date.now();

    const query = 'INSERT INTO tareas ( descripcion, fecha_creacion) VALUES (?, ?)';

   db.query(query, [ text, fecha], (err, results) => {
    if (err){
        console.log(err);
        
        console.error('Error al insertar tarea');
        return res.status(500).json({error: 'Error al guardar tarea'});
    }
    res.json({message: 'Tarea Guardada', id});
   });
});

app.get('/tareas/:id', (req, res) => {
    const {id} = req.params;
    const query = 'SELECT * FROM tareas WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) return
    res.status(500).send('Error al buscar tarea');
        if (result.length === 0) return
    res.status(404).send('Taea no encontrada');
        const tarea = results[0];
        res.send({
            id: tarea.id,
            descripcion:
            tarea.descripcion,
            fecha_creacion:
            tarea.fecha_creacion
        });        
    });
});

app.listen(PORT,() => {
    console.log(`Servidor corriendo en https://localhost:${PORT}`);
});