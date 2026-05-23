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
// OBTENER
// ==========================

router.get(
    '/',
    obtenerHistorial
);


// ==========================
// CREAR
// ==========================

router.post(
    '/',
    crearHistorial
);


module.exports =
    router;