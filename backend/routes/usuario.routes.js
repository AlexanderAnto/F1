const express =
    require('express');

const router =
    express.Router();

const {

    obtenerUsuarios,
    crearUsuario,
    crearAdmin,
    loginUsuario,
    actualizarUsuario

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
router.put(
    '/:id',
    actualizarUsuario
);
module.exports =
    router;