// ==========================
// tipoPago.routes.js
// ==========================

const express =
    require('express');

const router =
    express.Router();

const {

    obtenerTiposPago,
    crearTipoPago,
    obtenerMetodoPreferido,
    cambiarMetodoPreferido,
    eliminarTipoPago

} = require(
    '../controllers/tipoPago.controller'
);


// ==========================
// OBTENER TODOS
// ==========================

router.get(
    '/',
    obtenerTiposPago
);


// ==========================
// CREAR
// ==========================

router.post(
    '/',
    crearTipoPago
);


// ==========================
// OBTENER PREFERIDO
// ==========================

router.get(
    '/preferido/:id_usuario',
    obtenerMetodoPreferido
);


// ==========================
// CAMBIAR PREFERIDO
// ==========================

router.put(
    '/preferido',
    cambiarMetodoPreferido
);


// ==========================
// ELIMINAR
// ==========================

router.delete(
    '/:id',
    eliminarTipoPago
);


module.exports = router;