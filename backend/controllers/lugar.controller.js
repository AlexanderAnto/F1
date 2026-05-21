const conexion = require('../config/db');

const obtenerLugares = async (req, res) => {

    try {

        const [rows] = await conexion.query(
            'SELECT * FROM lugar'
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json(error);
    }
};

const crearLugar = async (req, res) => {

    try {

        const {
            pais_evento,
            pista_carrera
        } = req.body;

        const [result] = await conexion.query(`
            INSERT INTO lugar(
                pais_evento,
                pista_carrera
            )
            VALUES(?,?)
        `,
        [pais_evento, pista_carrera]);

        res.json({
            mensaje: 'Lugar creado',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json(error);
    }
};

module.exports = {
    obtenerLugares,
    crearLugar
};