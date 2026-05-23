// ==========================
// tipoPago.model.js
// ==========================

const conexion =
    require('../config/db');


// ==========================
// OBTENER TODOS
// ==========================

const obtenerTiposPago =
    async (id_usuario = null) => {

    let query =
    `
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

    // PREFERIDO PRIMERO

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
// CREAR
// ==========================

const crearTipoPago =
    async (datos) => {

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
    // QUITAR PREFERIDO ANTERIOR
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
    // INSERTAR
    // ==========================

    const [result] =
        await conexion.query(
        `
        INSERT INTO tipoPago
        (
            id_usuario,
            metodo,
            proveedor,
            ultimos_digitos,
            fecha_vencimiento,
            titular_cuenta,
            por_defecto
        )
        VALUES
        (
            ?,?,?,?,?,?,?
        )
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
// OBTENER PREFERIDO
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
// CAMBIAR PREFERIDO
// ==========================

const cambiarMetodoPreferido =
    async (
        id_usuario,
        id_tipoPago
    ) => {

    // VALIDAR

    const [metodo] =
        await conexion.query(
        `
        SELECT *
        FROM tipoPago
        WHERE
            id_tipoPago = ?
            AND id_usuario = ?
            AND esta_Eliminado = false
        `,
        [
            id_tipoPago,
            id_usuario
        ]
    );

    if (metodo.length === 0) {

        throw new Error(
            'Método inválido'
        );
    }

    // QUITAR TODOS

    await conexion.query(
        `
        UPDATE tipoPago
        SET por_defecto = false
        WHERE id_usuario = ?
        `,
        [id_usuario]
    );

    // NUEVO PREFERIDO

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