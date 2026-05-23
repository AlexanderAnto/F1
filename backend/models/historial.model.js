const conexion =
    require('../config/db');


// ==========================
// OBTENER HISTORIAL
// ==========================

const obtenerHistorial =
    async () => {

    const [rows] =
        await conexion.query(
        `
        SELECT

            h.id_historial,
            h.id_usuario,
            h.id_boleto,
            h.id_tipoPago,
            h.monto_pagado,
            h.fecha_compra,
            h.estado_pago,

            u.nombre,

            gp.nombre_gp,

            g.nombre_grada AS grada,

            CONCAT(
                'Fila ',
                a.fila,
                ' Asiento ',
                a.numero_asiento
            ) AS asiento

        FROM historial h

        INNER JOIN usuario u
            ON h.id_usuario =
            u.id_usuario

        INNER JOIN boleto b
            ON h.id_boleto =
            b.id_boleto

        INNER JOIN gp
            ON b.id_gp =
            gp.id_gp

        INNER JOIN asiento a
            ON b.id_asiento =
            a.id_asiento

        INNER JOIN grada g
            ON a.id_grada =
            g.id_grada

        ORDER BY
            h.fecha_compra DESC
        `
    );

    return rows;
};


// ==========================
// CREAR HISTORIAL
// ==========================

const crearHistorial =
    async (datos) => {

    const {

        id_usuario,
        id_boleto,
        id_tipoPago,
        monto_pagado,
        estado_pago

    } = datos;

    const [result] =
        await conexion.query(
        `
        INSERT INTO historial
        (
            id_usuario,
            id_boleto,
            id_tipoPago,
            monto_pagado,
            estado_pago
        )
        VALUES
        (
            ?,?,?,?,?
        )
        `,
        [
            id_usuario,
            id_boleto,
            id_tipoPago,
            monto_pagado,
            estado_pago
        ]
    );

    return result;
};


module.exports = {

    obtenerHistorial,
    crearHistorial
};