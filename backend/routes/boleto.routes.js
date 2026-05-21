const express = require('express');
const router = express.Router();

const {
    obtenerBoletos,
    crearBoleto
} = require('../controllers/boleto.controller');

router.get('/', obtenerBoletos);
router.post('/', crearBoleto);

module.exports = router;