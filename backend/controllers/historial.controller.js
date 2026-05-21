const conexion = require('../config/db');

const obtenerHistorial = async (req, res) => {

    try {

        const [rows] = await conexion.query(`
            SELECT
                h.id_historial,
                u.nombre,
                gp.nombre_gp,
                h.monto_pagado,
                h.fecha_compra,
                h.estado_pago
            FROM historial h
            INNER JOIN usuario u
            ON h.id_usuario = u.id_usuario
            INNER JOIN boleto b
            ON h.id_boleto = b.id_boleto
            INNER JOIN gran_premio gp
            ON b.id_gp = gp.id_gp
        `);

        res.json(rows);

    } catch (error) {

        res.status(500).json(error);
    }
};

const crearHistorial = async (req, res) => {

    try {

        const {
            id_usuario,
            id_boleto,
            id_tipoPago,
            monto_pagado,
            estado_pago
        } = req.body;

        const [result] = await conexion.query(`
            INSERT INTO historial(
                id_usuario,
                id_boleto,
                id_tipoPago,
                monto_pagado,
                estado_pago
            )
            VALUES(?,?,?,?,?)
        `,
        [
            id_usuario,
            id_boleto,
            id_tipoPago,
            monto_pagado,
            estado_pago
        ]);

        res.json({
            mensaje: 'Compra registrada',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json(error);
    }
};

module.exports = {
    obtenerHistorial,
    crearHistorial
};