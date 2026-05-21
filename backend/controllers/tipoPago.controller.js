const conexion = require('../config/db');

const obtenerTiposPago = async (req, res) => {

    try {

        const [rows] = await conexion.query(`
            SELECT *
            FROM tipoPago
            WHERE esta_Eliminado = false
        `);

        res.json(rows);

    } catch (error) {

        res.status(500).json(error);
    }
};

const crearTipoPago = async (req, res) => {

    try {

        const {
            id_usuario,
            metodo,
            proveedor,
            ultimos_digitos,
            fecha_vencimiento,
            titular_cuenta
        } = req.body;

        const [result] = await conexion.query(`
            INSERT INTO tipoPago(
                id_usuario,
                metodo,
                proveedor,
                ultimos_digitos,
                fecha_vencimiento,
                titular_cuenta
            )
            VALUES(?,?,?,?,?,?)
        `,
        [
            id_usuario,
            metodo,
            proveedor,
            ultimos_digitos,
            fecha_vencimiento,
            titular_cuenta
        ]);

        res.json({
            mensaje: 'Método de pago creado',
            id: result.insertId
        });

    } catch (error) {

        res.status(500).json(error);
    }
};

module.exports = {
    obtenerTiposPago,
    crearTipoPago
};