const conexion =
    require('../config/db');

const gpModel =
    require('../models/gp.model');


// ==========================
// OBTENER TODOS
// ==========================

const obtenerGP =
    async (req, res) => {

    try {

        const [rows] =
            await conexion.query(`
                SELECT
                    gp.*,
                    l.pais_evento,
                    l.pista_carrera
                FROM gran_premio gp
                INNER JOIN lugar l
                ON gp.id_lugar = l.id_lugar
                WHERE gp.esta_Eliminado = false
            `);

        res.json(rows);

    } catch (error) {

        res.status(500).json(error);
    }
};


// ==========================
// CREAR GP
// ==========================

const crearGP =
    async (req, res) => {

    try {

        const {

            nombre_gp,
            id_lugar,
            fecha_evento,
            hora_evento,
            maxima_Asistencia

        } = req.body;

        const [result] =
            await conexion.query(
            `
            INSERT INTO gran_premio(
                nombre_gp,
                id_lugar,
                fecha_evento,
                hora_evento,
                maxima_Asistencia
            )
            VALUES(?,?,?,?,?)
            `,
            [
                nombre_gp,
                id_lugar,
                fecha_evento,
                hora_evento,
                maxima_Asistencia
            ]
        );

        res.json({

            mensaje:
                'Gran Premio creado',

            id:
                result.insertId
        });

    } catch (error) {

        res.status(500).json(error);
    }
};


// ==========================
// OBTENER POR ID
// ==========================

const obtenerGPporID =
    async (req, res) => {

    try {

        const { id } =
            req.params;

        const gp =
            await gpModel
            .obtenerGPporID(id);

        res.json(gp);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje:
                'Error servidor',

            error:
                error.message
        });
    }
};


module.exports = {

    obtenerGP,
    crearGP,
    obtenerGPporID
};
