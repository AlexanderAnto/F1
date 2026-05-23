// ==========================
// API
// ==========================

const API =
'https://f1-backend-t4mn.onrender.com/api';


// ==========================
// USUARIO LOGUEADO
// ==========================

const usuario =
JSON.parse(
    localStorage.getItem(
        'usuario'
    )
);

const id_usuario =
    usuario.id_usuario;


// ==========================
// FORM
// ==========================

const form =
document.getElementById(
    'profileForm'
);


// ==========================
// INPUTS
// ==========================

const nombre =
document.getElementById(
    'nombre'
);

const apellido =
document.getElementById(
    'apellido'
);

const correo =
document.getElementById(
    'correo'
);

const telefono =
document.getElementById(
    'telefono'
);

const direccion =
document.getElementById(
    'direccion'
);

const pais =
document.getElementById(
    'pais'
);

const password_usuario =
document.getElementById(
    'password_usuario'
);


// ==========================
// TABLA
// ==========================

const tbody =
document.querySelector(
    '#tablaPagos tbody'
);


// ==========================
// CARGAR DATOS
// ==========================

function cargarPerfil() {

    nombre.value =
        usuario.nombre || '';

    apellido.value =
        usuario.apellido || '';

    correo.value =
        usuario.correo || '';

    telefono.value =
        usuario.telefono || '';

    direccion.value =
        usuario.direccion || '';

    pais.value =
        usuario.pais || '';
}


// ==========================
// GUARDAR CAMBIOS
// ==========================

form.addEventListener(
    'submit',
    async (e) => {

    e.preventDefault();

    try {

        const body = {

            nombre:
                nombre.value,

            apellido:
                apellido.value,

            correo:
                correo.value,

            telefono:
                telefono.value,

            direccion:
                direccion.value,

            pais:
                pais.value
        };

        // PASSWORD OPCIONAL

        if (
            password_usuario.value
            .trim() !== ''
        ) {

            body.password_usuario =
                password_usuario.value;
        }


        const response =
            await fetch(
            `${API}/usuarios/${id_usuario}`,
            {
                method: 'PUT',

                headers: {
                    'Content-Type':
                    'application/json'
                },

                body: JSON.stringify(
                    body
                )
            });

        const resultado =
            await response.json();

        console.log(resultado);


        // ==========================
        // ACTUALIZAR LOCALSTORAGE
        // ==========================

        const usuarioActualizado = {

            ...usuario,

            ...body
        };

        localStorage.setItem(
            'usuario',

            JSON.stringify(
                usuarioActualizado
            )
        );

        alert(
            'Perfil actualizado'
        );

    } catch (error) {

        console.log(error);

        alert(
            'Error actualizando perfil'
        );
    }
});


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

        tbody.innerHTML = '';

        // SI NO HAY METODOS

        if (
            metodos.length === 0
        ) {

            tbody.innerHTML =
            `
            <tr>

                <td colspan="5">

                    No hay métodos registrados

                </td>

            </tr>
            `;

            return;
        }

        // MOSTRAR METODOS

        metodos.forEach(metodo => {

            tbody.innerHTML +=
            `
            <tr>

                <td>
                    ${metodo.id_tipoPago}
                </td>

                <td>
                    ${metodo.metodo}
                </td>

                <td>
                    ${metodo.proveedor}
                </td>

                <td>
                    ${
                        metodo.por_defecto
                        ? 'SI'
                        : 'NO'
                    }
                </td>

                <td>

                    <button
                        onclick="
                        cambiarPreferido(
                            ${metodo.id_tipoPago}
                        )
                        "
                    >

                        Seleccionar

                    </button>

                </td>

            </tr>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}


// ==========================
// CAMBIAR PREFERIDO
// ==========================

window.cambiarPreferido =
async function(id_tipoPago) {

    try {

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
                id_tipoPago

            })
        });

        alert(
            'Método actualizado'
        );

        cargarMetodos();

    } catch (error) {

        console.log(error);
    }
};


// ==========================
// INICIAR
// ==========================

cargarPerfil();

cargarMetodos();