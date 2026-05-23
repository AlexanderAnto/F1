const express =
    require('express');

const router =
    express.Router();

const {

    obtenerHistorial,
    crearHistorial

} = require(
    '../controllers/historial.controller'
);


// ==========================
// OBTENER HISTORIAL
// ==========================

router.get(
    '/',
    obtenerHistorial
);


// ==========================
// CREAR HISTORIAL
// ==========================

router.post(
    '/',
    crearHistorial
);


module.exports =
    router;