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
module.exports = {

    obtenerUsuarios,
    crearUsuario, 
    buscarPorCorreo
};