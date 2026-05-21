const express = require('express');
const router = express.Router();

const {
    obtenerAsientos,
    crearAsiento
} = require('../controllers/asiento.controller');

router.get('/', obtenerAsientos);
router.post('/', crearAsiento);

module.exports = router;