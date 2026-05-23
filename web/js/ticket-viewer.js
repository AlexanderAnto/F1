import { initModal }
from './script-aux.js';


// ============================
// API
// ============================

const API =
    'https://f1-backend-t4mn.onrender.com/api';


// ============================
// ELEMENTOS
// ============================

const tbody =
    document.getElementById(
        'tbodyBoletos'
    );

const filterUser =
    document.getElementById(
        'filterUser'
    );

const filterGP =
    document.getElementById(
        'filterGP'
    );

const btnFiltrar =
    document.getElementById(
        'btnFiltrar'
    );

const btnMostrarTodos =
    document.getElementById(
        'btnMostrarTodos'
    );


// ============================
// DATOS
// ============================

let historialData = [];


// ============================
// CARGAR USUARIOS
// ============================

async function cargarUsuarios() {

    try {

        const response =
            await fetch(
                `${API}/usuarios`
            );

        const usuarios =
            await response.json();

        usuarios
        .filter(
            usuario =>
                usuario.rol === 'user'
        )
        .forEach(usuario => {

            filterUser.innerHTML +=
            `
            <option
                value="${usuario.nombre}">
                ${usuario.nombre}
            </option>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}


// ============================
// CARGAR GP
// ============================

async function cargarGP() {

    try {

        const response =
            await fetch(
                `${API}/gp`
            );

        const gp =
            await response.json();

        gp.forEach(evento => {

            filterGP.innerHTML +=
            `
            <option
                value="${evento.nombre_gp}">
                ${evento.nombre_gp}
            </option>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}


// ============================
// CARGAR BOLETOS
// ============================

async function cargarBoletos() {

    try {

        const response =
            await fetch(
                `${API}/historial`
            );

        historialData =
            await response.json();

        renderTabla(
            historialData
        );

    } catch (error) {

        console.log(error);
    }
}


// ============================
// RENDER TABLA
// ============================

function renderTabla(datos) {

    tbody.innerHTML = '';

    datos.forEach(boleto => {

        tbody.innerHTML +=
        `
        <tr>

            <td>
                ${boleto.id_historial}
            </td>

            <td>
                ${boleto.nombre}
            </td>

            <td>
                ${boleto.nombre_gp}
            </td>

            <td>
                ${boleto.grada || 'N/A'}
            </td>

            <td>
                ${boleto.asiento || 'N/A'}
            </td>

            <td>
                $${boleto.monto_pagado}
            </td>

            <td>
                ${new Date(
                    boleto.fecha_compra
                ).toLocaleDateString()}
            </td>

            <td>
                ${boleto.estado_pago}
            </td>

        </tr>
        `;
    });
}


// ============================
// FILTRAR
// ============================

btnFiltrar.addEventListener(
    'click',
    () => {

        const usuario =
            filterUser.value;

        const gp =
            filterGP.value;

        const filtrados =
            historialData.filter(
                boleto => {

                const coincideUsuario =
                    usuario === '' ||
                    boleto.nombre === usuario;

                const coincideGP =
                    gp === '' ||
                    boleto.nombre_gp === gp;

                return (
                    coincideUsuario &&
                    coincideGP
                );
            });

        renderTabla(
            filtrados
        );
    }
);


// ============================
// MOSTRAR TODOS
// ============================

btnMostrarTodos
.addEventListener(
    'click',
    () => {

        renderTabla(
            historialData
        );

        filterUser.value = '';

        filterGP.value = '';
    }
);


// ============================
// INICIAR
// ============================

cargarUsuarios();

cargarGP();

cargarBoletos();

initModal();