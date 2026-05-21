const conexion = require('../config/db');

const obtenerTiposPago = async () => {

    const [rows] = await conexion.query(`
        SELECT *
        FROM tipoPago
        WHERE esta_Eliminado = false
    `);

    return rows;
};

const crearTipoPago = async (datos) => {

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
    datos);

    return result;
};

module.exports = {
    obtenerTiposPago,
    crearTipoPago
};