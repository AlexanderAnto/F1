import { initModal } from './script-aux.js';

// ==========================
// CONFIG
// ==========================

const API =
    'https://f1-backend-t4mn.onrender.com/api/gradas';

const API_COLORES =
    'https://f1-backend-t4mn.onrender.com/api/gradas/colores';


// ==========================
// ELEMENTOS HTML
// ==========================

const form =
    document.getElementById(
        'gradaForm'
    );

const selectColor =
    document.getElementById(
        'color-grada'
    );

const tabla =
    document.querySelector(
        '#gradaTable tbody'
    );


// ==========================
// CARGAR COLORES ENUM
// ==========================

async function cargarColores() {

    try {

        const response =
            await fetch(API_COLORES);

        const colores =
            await response.json();

        selectColor.innerHTML =
            `
            <option value="">
                Seleccione un color
            </option>
            `;

        colores.forEach(color => {

            selectColor.innerHTML +=
                `
                <option value="${color}">
                    ${color}
                </option>
                `;
        });

    } catch (error) {

        console.log(error);
    }
}


// ==========================
// CARGAR GRADAS
// ==========================

async function cargarGradas() {

    try {

        const response =
            await fetch(API);

        const gradas =
            await response.json();

        tabla.innerHTML = '';

        gradas.forEach(grada => {

            tabla.innerHTML +=
                `
                <tr>

                    <td>
                        ${grada.id_grada}
                    </td>

                    <td>
                        ${grada.nombre_grada}
                    </td>

                    <td>
                        ${grada.color}
                    </td>

                    <td>
                        $${grada.precio}
                    </td>

                </tr>
                `;
        });

    } catch (error) {

        console.log(error);
    }
}


// ==========================
// AGREGAR GRADA
// ==========================

form.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        try {

            const nombre_grada =
                document.getElementById(
                    'name_grada'
                ).value;

            const color =
                document.getElementById(
                    'color-grada'
                ).value;

            const precio =
                document.getElementById(
                    'precio-grada'
                ).value;

            const response =
                await fetch(API, {

                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({

                        nombre_grada,
                        color,
                        precio
                    })
                });

            const data =
                await response.json();

            console.log(data);

            alert(
                'Grada agregada'
            );

            form.reset();

            cargarGradas();

        } catch (error) {

            console.log(error);
        }
    }
);


// ==========================
// INICIAR
// ==========================

cargarColores();
cargarGradas();
initModal();

