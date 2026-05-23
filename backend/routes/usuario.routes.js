const express =
    require('express');

const router =
    express.Router();

const {

    obtenerUsuarios,
    crearUsuario,
    crearAdmin,
    loginUsuario

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
router.post(
    '/login',
    loginUsuario
);

module.exports =
    router;