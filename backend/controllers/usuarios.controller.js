const bcrypt =
    require('bcrypt');

const usuarioModel =
    require('../models/usuario.model');


// ============================
// OBTENER USUARIOS
// ============================

const obtenerUsuarios =
    async (req, res) => {

    try {

        const rows =
            await usuarioModel
            .obtenerUsuarios();

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje:
                'Error servidor',

            error:
                error.message
        });
    }
};


// ============================
// CREAR USUARIO
// ============================

const crearUsuario =
    async (req, res) => {

    try {

        const {

            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            pais,
            password_usuario

        } = req.body;

        const passwordHash =
            await bcrypt.hash(
                password_usuario,
                10
            );

        const result =
            await usuarioModel
            .crearUsuario([
                nombre,
                apellido,
                correo,
                'user',
                telefono,
                direccion,
                pais,
                passwordHash
            ]);

        res.json({

            mensaje:
                'Usuario creado',

            id:
                result.insertId
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje:
                'Error servidor',

            error:
                error.message
        });
    }
};


// ============================
// CREAR ADMIN
// ============================

const crearAdmin =
    async (req, res) => {

    try {

        const {

            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            pais,
            password_usuario

        } = req.body;

        const passwordHash =
            await bcrypt.hash(
                password_usuario,
                10
            );

        const result =
            await usuarioModel
            .crearUsuario([
                nombre,
                apellido,
                correo,
                'Admin',
                telefono,
                direccion,
                pais,
                passwordHash
            ]);

        res.json({

            mensaje:
                'Administrador creado',

            id:
                result.insertId
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje:
                'Error servidor',

            error:
                error.message
        });
    }
};

const loginUsuario =
    async (req, res) => {

    try {

        const {
            correo,
            password
        } = req.body;

        // BUSCAR USUARIO

        const usuario =
            await usuarioModel
            .buscarPorCorreo(
                correo
            );

        // VALIDAR USUARIO

        if (!usuario) {

            return res.status(401)
            .json({

                mensaje:
                    'Correo incorrecto'
            });
        }

        // VALIDAR PASSWORD

        const passwordCorrecto =
            await bcrypt.compare(
                password,
                usuario.password_usuario
            );

        if (!passwordCorrecto) {

            return res.status(401)
            .json({

                mensaje:
                    'Contraseña incorrecta'
            });
        }

        // NO ENVIAR PASSWORD

        delete usuario.password_usuario;

        // LOGIN EXITOSO

        res.json({

            mensaje:
                'Login correcto',

            usuario
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            mensaje:
                'Error servidor',

            error:
                error.message
        });
    }
};
module.exports = {

    obtenerUsuarios,
    crearUsuario,
    crearAdmin,
    loginUsuario
};