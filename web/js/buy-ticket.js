const API =
    'https://f1-backend-t4mn.onrender.com/api';


// ==========================
// PARAMETROS URL
// ==========================

const params =
    new URLSearchParams(
        window.location.search
    );

const id_gp =
    params.get('id');


// ==========================
// USUARIO
// ==========================

const usuario =
    JSON.parse(
        localStorage.getItem(
            'usuario'
        )
    );


// ==========================
// VALIDAR LOGIN
// ==========================

if (!usuario) {

    alert(
        'Debe iniciar sesión'
    );

    window.location.href =
        '../pages/login.html';
}


// ==========================
// ELEMENTOS
// ==========================

const selectGP =
    document.getElementById('gp');

const selectGrada =
    document.getElementById('grada');

const selectAsiento =
    document.getElementById('asiento');

const precioLabel =
    document.getElementById('precioBoleto');

const form =
    document.getElementById('buyForm');

const cantidadInput =
    document.getElementById('Cantbolet');

const btnMin =
    document.getElementById('btnMin');

const btnMax =
    document.getElementById('btnMax');


// ==========================
// VARIABLES
// ==========================

let precioActual = 0;


// ==========================
// CARGAR GP
// ==========================

async function cargarGP() {

    try {

        const response =
            await fetch(
                `${API}/gp/${id_gp}`
            );

        const gp =
            await response.json();

        selectGP.innerHTML =
        `
            <option value="${gp.id_gp}">
                ${gp.nombre_gp}
            </option>
        `;

        selectGP.disabled = true;

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
            await fetch(
                `${API}/gradas`
            );

        const gradas =
            await response.json();

        selectGrada.innerHTML =
        `
            <option value="">
                Selecciona una Grada
            </option>
        `;

        gradas.forEach(grada => {

            selectGrada.innerHTML +=
            `
                <option
                    value="${grada.id_grada}"
                    data-precio="${grada.precio}"
                >
                    ${grada.nombre_grada}
                </option>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}


// ==========================
// CARGAR ASIENTOS
// ==========================

async function cargarAsientos(idGrada) {

    try {

        const response =
            await fetch(
                `${API}/asientos`
            );

        const asientos =
            await response.json();

        const filtrados =
            asientos.filter(
                a =>
                    a.id_grada == idGrada
            );

        selectAsiento.innerHTML =
        `
            <option value="">
                Selecciona un Asiento
            </option>
        `;

        filtrados.forEach(asiento => {

            selectAsiento.innerHTML +=
            `
                <option
                    value="${asiento.id_asiento}"
                >
                    Fila ${asiento.fila}
                    -
                    Asiento ${asiento.numero_asiento}
                </option>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}


// ==========================
// EVENTO GRADA
// ==========================

selectGrada.addEventListener(
    'change',
    () => {

        const option =
            selectGrada.options[
                selectGrada.selectedIndex
            ];

        precioActual =
            Number(
                option.dataset.precio
            );

        precioLabel.textContent =
            `$${precioActual}`;

        cargarAsientos(
            selectGrada.value
        );
    }
);


// ==========================
// BOTONES CANTIDAD
// ==========================

btnMin.addEventListener(
    'click',
    () => {

        let value =
            Number(
                cantidadInput.value
            );

        if (value > 1) {

            cantidadInput.value =
                value - 1;
        }
    }
);

btnMax.addEventListener(
    'click',
    () => {

        let value =
            Number(
                cantidadInput.value
            );

        cantidadInput.value =
            value + 1;
    }
);


// ==========================
// COMPRAR
// ==========================
form.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        const id_asiento =
            selectAsiento.value;

        const cantidad =
            cantidadInput.value;

        if (!id_asiento) {

            alert(
                'Seleccione un asiento'
            );

            return;
        }

        // URL LIMPIA SIN ESPACIOS

        const url =
            `payment.html?id_gp=${id_gp}&id_asiento=${id_asiento}&cantidad=${cantidad}&precio=${precioActual}&id_usuario=${usuario.id_usuario}`;

        console.log(url);

        window.location.href = url;
    }
);

// ==========================
// INICIAR
// ==========================

cargarGP();

cargarGradas();