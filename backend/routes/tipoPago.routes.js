const express = require('express');
const router = express.Router();

const {
    obtenerTiposPago,
    crearTipoPago
} = require('../controllers/tipoPago.controller');

router.get('/', obtenerTiposPago);
router.post('/', crearTipoPago);

module.exports = router;