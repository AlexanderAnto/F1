const historialModel =
    require('../models/historial.model');


// ==========================
// OBTENER HISTORIAL
// ==========================

const obtenerHistorial =
    async (req, res) => {

    try {

        const {
            id_usuario
        } = req.query;

        const historial =
            await historialModel
            .obtenerHistorial(
                id_usuario
            );

        res.json(historial);

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


// ==========================
// CREAR HISTORIAL
// ==========================

const crearHistorial =
    async (req, res) => {

    try {

        const result =
            await historialModel
            .crearHistorial(
                req.body
            );

        res.json({

            mensaje:
                'Historial creado',

            id:
                result.insertId
        });

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

    obtenerHistorial,
    crearHistorial
};