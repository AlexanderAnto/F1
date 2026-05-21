const conexion = require('../config/db');

const obtenerAsientos = async () => {

    const [rows] = await conexion.query(`
        SELECT
            a.*,
            g.nombre_grada,
            g.color
        FROM asiento a
        INNER JOIN grada g
        ON a.id_grada = g.id_grada
    `);

    return rows;
};

const crearAsiento = async (datos) => {

    const [result] = await conexion.query(`
        INSERT INTO asiento(
            fila,
            numero_asiento,
            id_grada
        )
        VALUES(?,?,?)
    `,
    datos);

    return result;
};

module.exports = {
    obtenerAsientos,
    crearAsiento
};