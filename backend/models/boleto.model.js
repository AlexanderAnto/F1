const conexion = require('../config/db');

const obtenerBoletos = async () => {

    const [rows] = await conexion.query(`
        SELECT
            b.id_boleto,
            gp.nombre_gp,
            a.fila,
            a.numero_asiento
        FROM boleto b
        INNER JOIN gran_premio gp
        ON b.id_gp = gp.id_gp
        INNER JOIN asiento a
        ON b.id_asiento = a.id_asiento
    `);

    return rows;
};

const crearBoleto = async (datos) => {

    const [result] = await conexion.query(`
        INSERT INTO boleto(
            id_gp,
            id_asiento
        )
        VALUES(?,?)
    `,
    datos);

    return result;
};

module.exports = {
    obtenerBoletos,
    crearBoleto
};