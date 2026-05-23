const express =
    require('express');

const router =
    express.Router();

const {

    obtenerUsuarios,
    crearUsuario,
    crearAdmin

} = require(
    '../controllers/usuarios.controller'
);

router.get(
    '/',
    obtenerUsuarios
);

router.post(
    '/',
    crearUsuario
);

router.post(
    '/admin',
    crearAdmin
);

module.exports =
    router;