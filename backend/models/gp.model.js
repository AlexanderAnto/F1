const conexion = require('../config/db');

const obtenerGP = async () => {

    const [rows] = await conexion.query(`
        SELECT
            gp.*,
            l.pais_evento,
            l.pista_carrera
        FROM gran_premio gp
        INNER JOIN lugar l
        ON gp.id_lugar = l.id_lugar
    `);

    return rows;
};

const crearGP = async (datos) => {

    const [result] = await conexion.query(`
        INSERT INTO gran_premio(
            nombre_gp,
            id_lugar,
            fecha_evento,
            hora_evento,
            maxima_Asistencia
        )
        VALUES(?,?,?,?,?)
    `,
    datos);

    return result;
};

const obtenerGPporID =
    async (id) => {

    const [rows] =
        await conexion.query(
            `
            SELECT *
            FROM gran_premio
            WHERE id_gp = ?
            `,
            [id]
        );

    return rows[0];
};
module.exports = {
    obtenerGP,
    crearGP,
    obtenerGPporID
};