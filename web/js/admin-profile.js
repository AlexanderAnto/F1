import { initModal } from './script-aux.js';
const API =
    'https://f1-backend-t4mn.onrender.com/api';

const form =
    document.getElementById(
        'adminForm'
    );

const tabla =
    document.querySelector(
        '#adminTable tbody'
    );

const paisesSelect =
    document.getElementById(
        'paises'
    );


// ===============================
// CARGAR PAISES
// ===============================

async function cargarPaises() {

    try {

        const response =
            await fetch(
                'https://restcountries.com/v3.1/all?fields=name'
            );

        const paises =
            await response.json();

        paises.sort((a, b) =>
            a.name.common.localeCompare(
                b.name.common
            )
        );

        paises.forEach(pais => {

            const option =
                document.createElement(
                    'option'
                );

            option.value =
                pais.name.common;

            option.textContent =
                pais.name.common;

            paisesSelect.appendChild(
                option
            );
        });

    } catch (error) {

        console.log(error);
    }
}


// ===============================
// CARGAR ADMINS
// ===============================

async function cargarAdmins() {

    try {

        const response =
            await fetch(
                `${API}/usuarios`
            );

        const admins =
            await response.json();

        tabla.innerHTML = '';

        admins
        .filter(
            usuario =>
                usuario.rol === 'Admin'
        )
        .forEach(admin => {

            tabla.innerHTML += `

                <tr>

                    <td>
                        ${admin.id_usuario}
                    </td>

                    <td>
                        ${admin.nombre}
                    </td>

                    <td>
                        ${admin.apellido}
                    </td>

                    <td>
                        ${admin.correo}
                    </td>

                    <td>
                        ${admin.pais}
                    </td>

                </tr>

            `;
        });

    } catch (error) {

        console.log(error);
    }
}


// ===============================
// CREAR ADMIN
// ===============================

form.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        const datos = {

            nombre:
                document.getElementById(
                    'nombre'
                ).value,

            apellido:
                document.getElementById(
                    'apellido'
                ).value,

            correo:
                document.getElementById(
                    'correo'
                ).value,

            telefono:
                document.getElementById(
                    'telefono'
                ).value,

            direccion:
                document.getElementById(
                    'direccion'
                ).value,

            pais:
                paisesSelect.value,

            password_usuario:
                document.getElementById(
                    'password'
                ).value,

            rol:
                'Admin'
        };

        try {

            const response =
                await fetch(
                    `${API}/usuarios/admin`,
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body:
                            JSON.stringify(
                                datos
                            )
                    }
                );

            const resultado =
                await response.json();

            alert(
                resultado.mensaje
            );

            form.reset();

            cargarAdmins();

        } catch (error) {

            console.log(error);

            alert(
                'Error al crear admin'
            );
        }
    }
);


// ===============================
// INICIAR
// ===============================

cargarPaises();

cargarAdmins();
initModal();