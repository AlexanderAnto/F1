const conexion = require('../config/db');

const obtenerGradas = async () => {

    const [rows] = await conexion.query(
        'SELECT * FROM grada'
    );

    return rows;
};

const crearGrada = async (datos) => {

    const [result] = await conexion.query(`
        INSERT INTO grada(
            nombre_grada,
            color,
            precio
        )
        VALUES(?,?,?)
    `,
    datos);

    return result;
};

const obtenerColores = async () => {

    const [rows] =
        await conexion.query(`
            SHOW COLUMNS
            FROM grada
            LIKE 'color'
        `);

    return rows;
};
module.exports = {
    obtenerGradas,
    crearGrada,
    obtenerColores
};