const express = require('express');
const router = express.Router();

const {
    obtenerGP,
    crearGP,
    obtenerGPporID
} = require('../controllers/gp.controller');

router.get('/', obtenerGP);
router.post('/', crearGP);
router.get(
    '/:id',
    obtenerGPporID
);
module.exports = router;