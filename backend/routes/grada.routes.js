const express = require('express');
const router = express.Router();

const {
    obtenerGradas,
    crearGrada,
    obtenerColores
} = require('../controllers/grada.controller');

router.get('/', obtenerGradas);
router.post('/', crearGrada);
router.get( '/colores',obtenerColores);
module.exports = router;