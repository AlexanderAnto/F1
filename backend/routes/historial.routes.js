const express = require('express');
const router = express.Router();

const {
    obtenerHistorial,
    crearHistorial
} = require('../controllers/historial.controller');

router.get('/', obtenerHistorial);
router.post('/', crearHistorial);

module.exports = router;