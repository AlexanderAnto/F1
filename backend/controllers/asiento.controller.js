const conexion = require('../config/db');

const obtenerAsientos = async (req, res) => {

    try {

        const [rows] = await conexion.query(`
            SELECT
                a.*,
                g.nombre_grada,
                g.color
            FROM asiento a
            INNER JOIN grada g
            ON a.id_grada = g.id_grada
        `);

        res.json(rows);

    } catch (error) {

        res.status(500).json(error);
    }
};

const crearAsiento = async (req, res) => {

    try {

        const {
            fila,
            numero_asiento,
            id_grada
        } = req.body;

        const [result] = await conexion.query(`
            INSERT INTO asiento(
                fila,
                numero_asiento,
                id_grada
            )
            VALUES(?,?,?)
        `,
        [fila, numero_asiento, id_grada]);

        res.json({
            mensaje: 'Asiento creado',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json(error);
    }
};

module.exports = {
    obtenerAsientos,
    crearAsiento
};