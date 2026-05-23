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

let max = 0;

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

        //mensaje
        
        max = gp.maxima_Asistencia;

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

let contBoleto = document.getElementById('Cantbolet');
let btnMin = document.getElementById('btnMin');
let btnMax = document.getElementById('btnMax');

btnMin.addEventListener('click', () => {
    let value = Number(contBoleto.value) || 0;

    if (value > 0) {
        contBoleto.value = value - 1;
    }
});

btnMax.addEventListener('click', () => {
    let value = Number(contBoleto.value) || 0;

    contBoleto.value = value + 1;
});
 
cargarGP();