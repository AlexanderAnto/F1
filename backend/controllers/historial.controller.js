const historialModel =
    require('../models/historial.model');


// ==========================
// OBTENER HISTORIAL
// ==========================

const obtenerHistorial =
    async (req, res) => {

    try {

        const historial =
            await historialModel
            .obtenerHistorial();

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