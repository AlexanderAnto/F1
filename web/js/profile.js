const API =
'https://f1-backend-t4mn.onrender.com/api';


// USUARIO LOGUEADO

 const usuario =
                JSON.parse(
                    localStorage.getItem(
                        'usuario'
                    )
                );

// TABLA

const tbody =
document.querySelector(
    '#tablaPagos tbody'
);


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

        const filtrados =
        metodos.filter(
            m =>
                m.id_usuario == id_usuario
        );

        tbody.innerHTML = '';

        filtrados.forEach(metodo => {

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
                        metodo.preferido
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

cargarMetodos();