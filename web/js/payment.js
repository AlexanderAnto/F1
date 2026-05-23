const API =
    'https://f1-backend-t4mn.onrender.com/api';


// ==========================
// PARAMETROS
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
// USUARIO
// ==========================

const usuario =
    JSON.parse(
        localStorage.getItem(
            'usuario'
        )
    );


// ==========================
// ELEMENTOS
// ==========================

const metodoPago =
    document.getElementById(
        'metodoPago'
    );

const camposPago =
    document.getElementById(
        'camposPago'
    );

const resumen =
    document.getElementById(
        'resumen'
    );

const guardarMetodo =
    document.getElementById(
        'guardarMetodo'
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
// CAMBIAR FORMULARIO
// ==========================

metodoPago.addEventListener(
    'change',
    () => {

        const metodo =
            metodoPago.value;

        camposPago.innerHTML = '';

        // ==========================
        // TARJETAS
        // ==========================

        if (
            metodo === 'Tarjeta de Crédito'
            ||
            metodo === 'Tarjeta de Débito'
        ) {

            camposPago.innerHTML =
                `
                <label>
                    Banco
                </label>

                <input
                    type="text"
                    id="proveedor"
                    required
                >

                <br><br>

                <label>
                    Número Tarjeta
                </label>

                <input
                    type="text"
                    id="numeroTarjeta"
                    maxlength="16"
                    required
                >

                <br><br>

                <label>
                    Fecha Vencimiento
                </label>

                <input
                    type="text"
                    id="fechaVencimiento"
                    placeholder="MM/YY"
                    required
                >

                <br><br>

                <label>
                    Titular
                </label>

                <input
                    type="text"
                    id="titular"
                    required
                >
            `;
        }

        // ==========================
        // PAYPAL
        // ==========================

        else if (
            metodo === 'PayPal'
        ) {

            camposPago.innerHTML =
                `
                <label>
                    Correo PayPal
                </label>

                <input
                    type="email"
                    id="paypalCorreo"
                    required
                >
            `;
        }

        // ==========================
        // EFECTIVO
        // ==========================

        else if (
            metodo === 'Efectivo'
        ) {

            camposPago.innerHTML =
                `
                <p>
                    Pago en efectivo al recoger boletos
                </p>
            `;
        }
    }
);


// ==========================
// PAGAR
// ==========================

form.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        try {

            let id_tipoPago = null;

            // ==========================
            // GUARDAR METODO
            // ==========================

            if (
                guardarMetodo.checked
            ) {

                let proveedor = '';
                let ultimos = null;
                let vencimiento = null;
                let titular = null;

                // TARJETAS

                if (
                    metodoPago.value ===
                    'Tarjeta de Crédito'
                    ||
                    metodoPago.value ===
                    'Tarjeta de Débito'
                ) {

                    const numero =
                        document.getElementById(
                            'numeroTarjeta'
                        ).value;

                    proveedor =
                        document.getElementById(
                            'proveedor'
                        ).value;

                    ultimos =
                        numero.slice(-4);

                    vencimiento =
                        document.getElementById(
                            'fechaVencimiento'
                        ).value;

                    titular =
                        document.getElementById(
                            'titular'
                        ).value;
                }

                // PAYPAL

                if (
                    metodoPago.value ===
                    'PayPal'
                ) {

                    proveedor =
                        document.getElementById(
                            'paypalCorreo'
                        ).value;
                }

                // EFECTIVO

                if (
                    metodoPago.value ===
                    'Efectivo'
                ) {

                    proveedor =
                        'Pago presencial';
                }

                // CREAR METODO

                const responseMetodo =
                    await fetch(
                        `${API}/tiposPago`,
                        {
                            method: 'POST',

                            headers: {
                                'Content-Type':
                                    'application/json'
                            },

                            body: JSON.stringify({

                                id_usuario:
                                    usuario.id_usuario,

                                metodo:
                                    metodoPago.value,

                                proveedor,

                                ultimos_digitos:
                                    ultimos,

                                fecha_vencimiento:
                                    vencimiento,

                                titular_cuenta:
                                    titular,

                                por_defecto:
                                    true
                            })
                        }
                    );

                const metodoCreado =
                    await responseMetodo.json();

                id_tipoPago =
                    metodoCreado.id;
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
                            id_asiento
                        })
                    }
                );

            const boleto =
                await responseBoleto.json();


            // ==========================
            // CREAR HISTORIAL
            // ==========================
            if (!id_tipoPago) {

                alert(
                    'Seleccione o registre un método de pago'
                );

                return;
            }
            await fetch(
                `${API}/historial`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({

                        id_usuario:
                            usuario.id_usuario,

                        id_boleto:
                            boleto.id_boleto || boleto.id,

                        id_tipoPago:
                            id_tipoPago,

                        monto_pagado:
                            precio * cantidad,

                        estado_pago:
                            'Completado'
                    })
                }
            );

            alert(
                'Pago realizado'
            );

            window.location.href =
                '../../index.html';

        } catch (error) {

            console.log(error);

            alert(
                'Error al pagar'
            );
        }
    }
);