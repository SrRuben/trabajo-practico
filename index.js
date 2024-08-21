const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuramos los archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // Aquí configuramos express.static

mongoose.connect('mongodb://localhost:27017/registroUsuarios', {
    
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar a MongoDB', err);
});

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    contraseña: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Ruta para registrar un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    const { nombre, email, contraseña } = req.body;

    const nuevoUsuario = new Usuario({ nombre, email, contraseña });

    try {
        await nuevoUsuario.save();
        res.status(201).send('Usuario registrado con éxito');
    } catch (error) {
        res.status(500).send('Error al registrar usuario');
    }
});

// Ruta en donde obtenemos todos los usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).send('Error al obtener usuarios');
    }
});

// Ruta en la que servimos el archivo HTML principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
