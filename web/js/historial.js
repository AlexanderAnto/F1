// =========================
// API
// =========================

const API =
    "https://f1-backend-t4mn.onrender.com/api/historial";


// =========================
// TABLA
// =========================

const tabla =
    document.getElementById(
        "tablaHistorial"
    );


// =========================
// SESIÓN
// =========================

const usuarioGuardado =
    localStorage.getItem(
        "usuario"
    );


// =========================
// VALIDAR SESIÓN
// =========================

if (!usuarioGuardado) {

    window.location.href =
        "../../index.html";
}


// =========================
// USUARIO
// =========================

const usuario =
    JSON.parse(
        usuarioGuardado
    );

console.log(
    'Usuario localStorage:',
    usuario
);


// =========================
// CARGAR HISTORIAL
// =========================

async function cargarHistorial() {

    try {


        const response =
            await fetch(
                `${API}?id_usuario=${usuario.id_usuario}`
            );

        tabla.innerHTML = "";

        const historialUsuario =
            await response.json();


        // =========================
        // FILTRAR POR USUARIO
        // =========================



        // =========================
        // VALIDAR HISTORIAL
        // =========================

        if (
            historialUsuario.length === 0
        ) {

            tabla.innerHTML =
                `
                <tr>

                    <td colspan="5">
                        No hay compras registradas
                    </td>

                </tr>
                `;

            return;
        }


        // =========================
        // MOSTRAR DATOS
        // =========================

        historialUsuario.forEach(
            pago => {

                tabla.innerHTML +=
                    `
                <tr>

                    <td>
                        ${pago.id_boleto}
                    </td>

                    <td>
                        ${pago.id_tipoPago}
                    </td>

                    <td>
                        $${pago.monto_pagado}
                    </td>

                    <td>
                        ${new Date(
                        pago.fecha_compra
                    ).toLocaleString()}
                    </td>

                    <td>
                        ${pago.estado_pago}
                    </td>

                </tr>
                `;
            }
        );

    } catch (error) {

        console.log(error);

        tabla.innerHTML =
            `
            <tr>

                <td colspan="5">
                    Error al cargar historial
                </td>

            </tr>
            `;
    }
}


// =========================
// VOLVER
// =========================

document.getElementById(
    "volver"
).addEventListener(
    "click",
    () => {

        window.location.href =
            "gp-selector.html";
    }
);


// =========================
// INICIAR
// =========================

cargarHistorial();