const tipoPagoModel =
    require('../models/tipoPago.model');


// ==========================
// OBTENER TODOS
// ==========================

const obtenerTiposPago =
    async (req, res) => {

    try {

        const {
            id_usuario
        } = req.query;

        const tiposPago =
            await tipoPagoModel
            .obtenerTiposPago(
                id_usuario
            );

        res.json(tiposPago);

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
// CREAR METODO PAGO
// ==========================

const crearTipoPago =
    async (req, res) => {

    try {

        const result =
            await tipoPagoModel
            .crearTipoPago(
                req.body
            );

        res.json({

            mensaje:
                'Método de pago creado',

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


// ==========================
// OBTENER PREFERIDO
// ==========================

const obtenerMetodoPreferido =
    async (req, res) => {

    try {

        const {
            id_usuario
        } = req.params;

        const metodo =
            await tipoPagoModel
            .obtenerMetodoPreferido(
                id_usuario
            );

        res.json(metodo);

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
// CAMBIAR PREFERIDO
// ==========================

const cambiarMetodoPreferido =
    async (req, res) => {

    try {

        const {
            id_usuario,
            id_tipoPago
        } = req.body;

        await tipoPagoModel
            .cambiarMetodoPreferido(
                id_usuario,
                id_tipoPago
            );

        res.json({

            mensaje:
                'Método preferido actualizado'
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


// ==========================
// ELIMINAR METODO
// ==========================

const eliminarTipoPago =
    async (req, res) => {

    try {

        const {
            id
        } = req.params;

        await tipoPagoModel
            .eliminarTipoPago(id);

        res.json({

            mensaje:
                'Método eliminado'
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

    obtenerTiposPago,
    crearTipoPago,
    obtenerMetodoPreferido,
    cambiarMetodoPreferido,
    eliminarTipoPago
};