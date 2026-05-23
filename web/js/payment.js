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

const id_usuario =
    params.get('id_usuario');


// ==========================
// USUARIO
// ==========================

const usuario =
    JSON.parse(
        localStorage.getItem(
            'usuario'
        )
    );


// ==========================
// VALIDAR LOGIN
// ==========================

if (!usuario) {

    alert(
        'Debe iniciar sesión'
    );

    window.location.href =
        '../pages/login.html';
}


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
                `${API}/tiposPago?id_usuario=${id_usuario}`
            );

        const metodos =
            await response.json();

        metodoPago.innerHTML =
        `
            <option value="">
                Seleccione método
            </option>
        `;

        metodos.forEach(metodo => {

            metodoPago.innerHTML +=
            `
            <option
                value="${metodo.id_tipoPago}"

                ${metodo.por_defecto
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

        alert(
            'Error cargando métodos'
        );
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

            if (!metodoPago.value) {

                alert(
                    'Seleccione un método de pago'
                );

                return;
            }


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
                            id_asiento,
                            id_usuario
                        })
                    }
                );

            const boleto =
                await responseBoleto.json();


            // ==========================
            // CAMBIAR PREFERIDO
            // ==========================

            await fetch(
                `${API}/tiposPago/preferido`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({

                        id_usuario,

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

                        id_usuario,

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
                'Pago realizado correctamente'
            );

            window.location.href =
                '../index.html';

        } catch (error) {

            console.log(error);

            alert(
                'Error al procesar pago'
            );
        }
    });


// ==========================
// INICIAR
// ==========================

cargarMetodos();