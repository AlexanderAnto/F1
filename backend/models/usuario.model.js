const conexion =
    require('../config/db');


// ============================
// OBTENER USUARIOS
// ============================

const obtenerUsuarios =
    async () => {

    const [rows] =
        await conexion.query(`
            SELECT
                id_usuario,
                nombre,
                apellido,
                correo,
                rol,
                telefono,
                direccion,
                pais
            FROM usuario
        `);

    return rows;
};


// ============================
// CREAR USUARIO
// ============================

const crearUsuario =
    async (datos) => {

    const [result] =
        await conexion.query(
        `
        INSERT INTO usuario(
            nombre,
            apellido,
            correo,
            rol,
            telefono,
            direccion,
            pais,
            password_usuario
        )
        VALUES(?,?,?,?,?,?,?,?)
        `,
        datos
    );

    return result;
};

const buscarPorCorreo =
    async (correo) => {

    const [rows] =
        await conexion.query(
        `
        SELECT *
        FROM usuario
        WHERE correo = ?
        `,
        [correo]
    );

    return rows[0];
};

const actualizarUsuario =
async (id_usuario, datos) => {

    const {

        nombre,
        apellido,
        correo,
        telefono,
        direccion,
        pais,
        password_usuario

    } = datos;

    let query =
    `
    UPDATE usuario
    SET

        nombre = ?,
        apellido = ?,
        correo = ?,
        telefono = ?,
        direccion = ?,
        pais = ?
    `;

    let valores = [

        nombre,
        apellido,
        correo,
        telefono,
        direccion,
        pais
    ];

    // PASSWORD OPCIONAL

    if (password_usuario) {

        query +=
        `,
        password_usuario = ?
        `;

        valores.push(
            password_usuario
        );
    }

    query +=
    `
    WHERE id_usuario = ?
    `;

    valores.push(id_usuario);

    const [result] =
    await conexion.query(
        query,
        valores
    );

    return result;
};
module.exports = {

    obtenerUsuarios,
    crearUsuario, 
    buscarPorCorreo,
    actualizarUsuario
};