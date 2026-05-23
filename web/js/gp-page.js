import { initModal } from './script-aux.js';
const API =
    'https://f1-backend-t4mn.onrender.com/api';


// ==========================
// ELEMENTOS
// ==========================

const form =
    document.getElementById(
        'gpForm'
    );

const selectLugar =
    document.getElementById(
        'listlugar'
    );

const inputFecha =
    document.getElementById(
        'dayEvent'
    );

const inputHora =
    document.getElementById(
        'timeEvent'
    );

const tbody =
    document.querySelector(
        '#tablaGP tbody'
    );


// ==========================
// CARGAR LUGARES
// ==========================

async function cargarLugares() {

    try {

        const response =
            await fetch(
                `${API}/lugares`
            );

        const lugares =
            await response.json();

        console.log(lugares);

        selectLugar.innerHTML = `
        
            <option value="">
                Selecciona un Lugar
            </option>
        
        `;

        lugares.forEach(lugar => {

            selectLugar.innerHTML += `
            
                <option value="${lugar.id_lugar}">
                    ${lugar.pais_evento}
                    -
                    ${lugar.pista_carrera}
                </option>
            
            `;
        });

    } catch (error) {

        console.log(error);

        alert(
            'Error cargando lugares'
        );
    }
}


// ==========================
// CARGAR GP
// ==========================

async function cargarGP() {

    try {

        const response =
            await fetch(
                `${API}/gp`
            );

        const gp =
            await response.json();

        console.log(gp);

        tbody.innerHTML = '';

        gp.forEach(evento => {

            // FORMATEAR FECHA

            const fecha =
                new Date(
                    evento.fecha_evento
                );

            const fechaFormateada =
                fecha.toLocaleDateString(
                    'es-MX',
                    {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }
                );

            tbody.innerHTML += `

                <tr>

                    <td>
                        ${evento.id_gp}
                    </td>

                    <td>
                        ${evento.nombre_gp}
                    </td>

                    <td>
                        ${evento.pais_evento}
                    </td>

                    <td>
                        ${evento.pista_carrera}
                    </td>

                    <td>
                        ${fechaFormateada}
                    </td>

                    <td>
                        ${evento.hora_evento}
                    </td>

                </tr>

            `;
        });

    } catch (error) {

        console.log(error);

        alert(
            'Error cargando GP'
        );
    }
}


// ==========================
// CREAR GP
// ==========================

form.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        try {

            const id_lugar =
                selectLugar.value;

            const fecha_evento =
                inputFecha.value;

            const hora_evento =
                inputHora.value;

            if (
                id_lugar === '' ||
                fecha_evento === '' ||
                hora_evento === ''
            ) {

                alert(
                    'Completa todos los campos'
                );

                return;
            }

            // OBTENER TEXTO DEL SELECT

            const option =
                selectLugar.options[
                    selectLugar.selectedIndex
                ];

            const texto =
                option.text;

            // GENERAR NOMBRE GP

            const nombre_gp =
                `GP ${texto}`;

            // VALOR TEMPORAL

            const maxima_Asistencia =
                100000;

            const datos = {

                nombre_gp,

                id_lugar,

                fecha_evento,

                hora_evento,

                maxima_Asistencia
            };

            console.log(datos);

            // ENVIAR AL BACKEND

            const response =
                await fetch(
                    `${API}/gp`,
                    {

                        method: 'POST',

                        headers: {

                            'Content-Type':
                                'application/json'
                        },

                        body:
                            JSON.stringify(datos)
                    }
                );

            const resultado =
                await response.json();

            console.log(resultado);

            alert(
                'GP creado correctamente'
            );

            // LIMPIAR FORMULARIO

            form.reset();

            // RECARGAR TABLA

            cargarGP();

        } catch (error) {

            console.log(error);

            alert(
                'Error creando GP'
            );
        }
    }
);


// ==========================
// INICIAR
// ==========================

cargarLugares();

cargarGP();
initModal();