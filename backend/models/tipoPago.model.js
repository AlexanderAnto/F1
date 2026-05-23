const conexion = require('../config/db');


// ==========================
// OBTENER TIPOS DE PAGO
// ==========================

const obtenerTiposPago = async (id_usuario = null) => {

    let query = `
        SELECT *
        FROM tipoPago
        WHERE esta_Eliminado = false
    `;

    let valores = [];

    // FILTRAR POR USUARIO

    if (id_usuario) {

        query += `
            AND id_usuario = ?
        `;

        valores.push(id_usuario);
    }

    // ORDENAR EL PREFERIDO PRIMERO

    query += `
        ORDER BY por_defecto DESC
    `;

    const [rows] =
        await conexion.query(
            query,
            valores
        );

    return rows;
};


// ==========================
// CREAR METODO DE PAGO
// ==========================

const crearTipoPago = async (datos) => {

    const {

        id_usuario,
        metodo,
        proveedor,
        ultimos_digitos,
        fecha_vencimiento,
        titular_cuenta,
        por_defecto

    } = datos;


    // ==========================
    // SI ES PREFERIDO
    // QUITAR EL ANTERIOR
    // ==========================

    if (por_defecto) {

        await conexion.query(
            `
            UPDATE tipoPago
            SET por_defecto = false
            WHERE id_usuario = ?
            `,
            [id_usuario]
        );
    }


    // ==========================
    // INSERTAR NUEVO
    // ==========================

    const [result] =
        await conexion.query(
        `
        INSERT INTO tipoPago(
            id_usuario,
            metodo,
            proveedor,
            ultimos_digitos,
            fecha_vencimiento,
            titular_cuenta,
            por_defecto
        )
        VALUES(?,?,?,?,?,?,?)
        `,
        [
            id_usuario,
            metodo,
            proveedor,
            ultimos_digitos || null,
            fecha_vencimiento || null,
            titular_cuenta || null,
            por_defecto || false
        ]
    );

    return result;
};


// ==========================
// OBTENER METODO PREFERIDO
// ==========================

const obtenerMetodoPreferido =
    async (id_usuario) => {

    const [rows] =
        await conexion.query(
        `
        SELECT *
        FROM tipoPago
        WHERE
            id_usuario = ?
            AND por_defecto = true
            AND esta_Eliminado = false
        LIMIT 1
        `,
        [id_usuario]
    );

    return rows[0];
};


// ==========================
// CAMBIAR METODO PREFERIDO
// ==========================

const cambiarMetodoPreferido =
    async (
        id_usuario,
        id_tipoPago
    ) => {

    // QUITAR TODOS

    await conexion.query(
        `
        UPDATE tipoPago
        SET por_defecto = false
        WHERE id_usuario = ?
        `,
        [id_usuario]
    );

    // ACTIVAR NUEVO

    const [result] =
        await conexion.query(
        `
        UPDATE tipoPago
        SET por_defecto = true
        WHERE
            id_tipoPago = ?
            AND id_usuario = ?
        `,
        [
            id_tipoPago,
            id_usuario
        ]
    );

    return result;
};


// ==========================
// ELIMINAR LOGICO
// ==========================

const eliminarTipoPago =
    async (id_tipoPago) => {

    const [result] =
        await conexion.query(
        `
        UPDATE tipoPago
        SET esta_Eliminado = true
        WHERE id_tipoPago = ?
        `,
        [id_tipoPago]
    );

    return result;
};


module.exports = {

    obtenerTiposPago,
    crearTipoPago,
    obtenerMetodoPreferido,
    cambiarMetodoPreferido,
    eliminarTipoPago
};