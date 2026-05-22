const conexion = require('../config/db');
const bcrypt = require('bcrypt');

const obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await conexion.query('SELECT * FROM usuario');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, correo, telefono, direccion, pais, password_usuario } = req.body;
        const passwordHash = await bcrypt.hash(password_usuario, 10);
        const [result] = await conexion.query(
            `INSERT INTO usuario (nombre, apellido, correo, rol, telefono, direccion, pais, password_usuario)
             VALUES (?, ?, ?, 'user', ?, ?, ?, ?)`,
            [nombre, apellido, correo, telefono, direccion, pais, passwordHash]
        );
        res.json({ mensaje: 'Usuario creado', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { obtenerUsuarios, crearUsuario };