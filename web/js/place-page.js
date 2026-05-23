import { initModal } from './script-aux.js';
// ==========================
// CONFIG API
// ==========================

const API =
    'https://f1-backend-t4mn.onrender.com/api/lugares';


// ==========================
// ELEMENTOS HTML
// ==========================

const form =
    document.getElementById(
        'lugarForm'
    );

const selectPaises =
    document.getElementById(
        'paises'
    );

const tabla =
    document.querySelector(
        '#lugarTable tbody'
    );


// ==========================
// CARGAR PAISES
// ==========================

async function cargarPaises() {

    try {

        const response =
            await fetch(
                'https://restcountries.com/v3.1/all?fields=name'
            );

        const countries =
            await response.json();

        countries.sort(
            (a, b) =>

            a.name.common.localeCompare(
                b.name.common
            )
        );

        countries.forEach(country => {

            selectPaises.innerHTML +=
            `
            <option value="${country.name.common}">
                ${country.name.common}
            </option>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}


// ==========================
// CARGAR LUGARES
// ==========================

async function cargarLugares() {

    try {

        const response =
            await fetch(API);

        const lugares =
            await response.json();

        tabla.innerHTML = '';

        lugares.forEach(lugar => {

            tabla.innerHTML +=
            `
            <tr>

                <td>
                    ${lugar.id_lugar}
                </td>

                <td>
                    ${lugar.pais_evento}
                </td>

                <td>
                    ${lugar.pista_carrera}
                </td>

            </tr>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}


// ==========================
// CREAR LUGAR
// ==========================

form.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        try {

            const datos = {

                pais_evento:
                    selectPaises.value,

                pista_carrera:
                    document.getElementById(
                        'PistaEvento'
                    ).value
            };

            console.log(datos);

            const response =
                await fetch(API, {

                    method: 'POST',

                    headers: {

                        'Content-Type':
                            'application/json'
                    },

                    body:
                        JSON.stringify(
                            datos
                        )
                });

            const resultado =
                await response.json();

            console.log(resultado);

            if (!response.ok) {

                alert(
                    'Error al crear lugar'
                );

                return;
            }

            alert(
                'Lugar creado correctamente'
            );

            form.reset();

            cargarLugares();

        } catch (error) {

            console.log(error);

            alert(
                'Error de conexión'
            );
        }
    }
);


// ==========================
// INICIAR
// ==========================

cargarPaises();
cargarLugares();
initModal();