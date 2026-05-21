const params =
    new URLSearchParams(
        window.location.search
    );

const id_gp =
    params.get('id');

console.log(id_gp);


// SELECT GP

const selectGP =
    document.getElementById(
        'gp'
    );


// ==========================
// CARGAR GP
// ==========================

async function cargarGP() {

    try {

        const response =
            await fetch(
                `http://localhost:3000/api/gp/${id_gp}`
            );

        const gp =
            await response.json();

        console.log(gp);

        // INSERTAR GP

        selectGP.innerHTML = `

            <option value="${gp.id_gp}">
                ${gp.nombre_gp}
            </option>

        `;

        // DESHABILITAR CAMBIO

        selectGP.disabled = true;

    } catch (error) {

        console.log(error);
    }
}


// ==========================
// INICIAR
// ==========================

cargarGP();