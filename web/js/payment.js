const API =
    'https://f1-backend-t4mn.onrender.com/api';


// ==========================
// PARAMS
// ==========================

const params =
    new URLSearchParams(
        window.location.search
    );

const id_gp =
    params.get('id_gp');

const id_asiento =
    params.get('id_asiento');

const cantidad =
    params.get('cantidad');

const precio =
    params.get('precio');


// ==========================
// ELEMENTOS
// ==========================

const metodoPago =
    document.getElementById(
        'metodoPago'
    );

const resumen =
    document.getElementById(
        'resumen'
    );

const form =
    document.getElementById(
        'paymentForm'
    );


// ==========================
// RESUMEN
// ==========================

resumen.innerHTML =
    `
Cantidad:
${cantidad}

<br>

Total:
$${precio * cantidad}
`;


// ==========================
// CARGAR METODOS
// ==========================

async function cargarMetodos() {

    try {

        const response =
            await fetch(
                `${API}/tiposPago`
            );

        const metodos =
            await response.json();

        const usuarioMetodos =
            metodos.filter(
                m =>
                    m.id_usuario == 1
            );

        usuarioMetodos.forEach(metodo => {

            metodoPago.innerHTML +=
                `
                <option
                    value="${metodo.id_tipoPago}"

                    ${metodo.preferido
                    ? 'selected'
                    : ''
                }
                >

                    ${metodo.metodo}
                    -
                    ${metodo.proveedor}

                </option>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}

// ==========================
// PAGAR
// ==========================

form.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        try {

            // ==========================
            // CREAR BOLETO
            // ==========================

            const responseBoleto =
                await fetch(
                    `${API}/boletos`,
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({

                            id_gp,
                            id_asiento

                        })
                    }
                );

            const boleto =
                await responseBoleto.json();




            const usuario =
                JSON.parse(
                    localStorage.getItem(
                        'usuario'
                    )
                );

            await fetch(
                `${API}/tiposPago/preferido`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({

                        id_usuario:
                            usuario.id_usuario,

                        id_tipoPago:
                            metodoPago.value
                    })
                }
            );
            // ==========================
            // HISTORIAL
            // ==========================

            await fetch(
                `${API}/historial`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({

                        id_usuario: 1,

                        id_boleto:
                            boleto.id,

                        id_tipoPago:
                            metodoPago.value,

                        monto_pagado:
                            precio * cantidad,

                        estado_pago:
                            'Pagado'
                    })
                }
            );

            alert(
                'Pago realizado'
            );

            window.location.href =
                '../pages/index.html';

        } catch (error) {

            console.log(error);

            alert(
                'Error al pagar'
            );
        }
    });


// ==========================
// INICIAR
// ==========================

cargarMetodos();