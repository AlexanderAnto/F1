import { initModal } from './script-aux.js';
// ==========================
// API
// ==========================

const API =
    'https://f1-backend-t4mn.onrender.com/api/usuarios';


// ==========================
// TABLA
// ==========================

const tabla =
    document.querySelector(
        '.tableUser tbody'
    );


// ==========================
// CARGAR USUARIOS
// ==========================

async function cargarUsuarios() {

    try {

        const response =
            await fetch(API);

        const usuarios =
            await response.json();

        console.log(usuarios);

        tabla.innerHTML = '';

        usuarios.forEach(usuario => {

            tabla.innerHTML +=
            `
            <tr>

                <td>
                    ${usuario.id_usuario}
                </td>

                <td>
                    ${usuario.nombre}
                    ${usuario.apellido}
                </td>

                <td>
                    ${usuario.correo}
                </td>

            </tr>
            `;
        });

    } catch (error) {

        console.log(error);

        tabla.innerHTML =
            `
            <tr>

                <td colspan="3">
                    Error al cargar usuarios
                </td>

            </tr>
            `;
    }
}


// ==========================
// INICIAR
// ==========================

cargarUsuarios();

initModal();