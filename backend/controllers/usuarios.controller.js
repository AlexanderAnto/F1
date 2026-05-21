const conexion = require('../config/db');
const bcrypt = require('bcrypt');

const obtenerUsuarios = (req, res) => {

    const sql = 'SELECT * FROM usuario';

    conexion.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
};

const crearUsuario = async (req, res) => {

    try {

        const {
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            pais,
            password_usuario
        } = req.body;

        const passwordHash = await bcrypt.hash(password_usuario, 10);

        const sql = `
            INSERT INTO usuario
            (
                nombre,
                apellido,
                correo,
                rol,
                telefono,
                direccion,
                pais,
                password_usuario
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        conexion.query(
            sql,
            [
                nombre,
                apellido,
                correo,
                'user',
                telefono,
                direccion,
                pais,
                passwordHash
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    mensaje: 'Usuario creado',
                    id: result.insertId
                });
            }
        );

    } catch (error) {

        res.status(500).json(error);
    }
};

module.exports = {
    obtenerUsuarios,
    crearUsuario
};