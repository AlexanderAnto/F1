const conexion = require('../config/db');

const obtenerLugares = async () => {

    const [rows] = await conexion.query(
        'SELECT * FROM lugar'
    );

    return rows;
};

const crearLugar = async (datos) => {

    const [result] = await conexion.query(`
        INSERT INTO lugar(
            pais_evento,
            pista_carrera
        )
        VALUES(?,?)
    `,
    datos);

    return result;
};

module.exports = {
    obtenerLugares,
    crearLugar
};