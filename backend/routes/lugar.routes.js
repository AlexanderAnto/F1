const express = require('express');
const router = express.Router();

const {
    obtenerLugares,
    crearLugar
} = require('../controllers/lugar.controller');

router.get('/', obtenerLugares);
router.post('/', crearLugar);

module.exports = router;