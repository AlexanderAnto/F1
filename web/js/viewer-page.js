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

        usuarios
        .filter(
            usuario =>
                usuario.rol === 'user'
        )
        .forEach(usuario => {

            tabla.innerHTML +=
            `
            <tr>

                <td>
                    ${usuario.id_usuario}
                </td>

                <td>
                    ${usuario.nombre}
                </td>

                <td>
                    ${usuario.apellido}
                </td>

                <td>
                    ${usuario.correo}
                </td>

                <td>
                    ${usuario.rol}
                </td>

                <td>
                    ${usuario.telefono}
                </td>

                <td>
                    ${usuario.direccion}
                </td>

                <td>
                    ${usuario.pais}
                </td>

            </tr>
            `;
        });

    } catch (error) {

        console.log(error);

        tabla.innerHTML =
            `
            <tr>

                <td colspan="8">
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