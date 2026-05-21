const contenedor =
    document.getElementById(
        'contenedorGP'
    );

async function cargarGP() {

    try {

        // PETICIÓN AL BACKEND

        const response =
            await fetch(
                'http://localhost:3000/api/gp'
            );

        // CONVERTIR JSON A OBJETO JS

        const gp =
            await response.json();

        console.log(gp);

        // LIMPIAR CONTENEDOR

        contenedor.innerHTML = '';

        // CREAR CARDS

        gp.forEach(evento => {

            // FORMATEAR FECHA

            const fecha =
                new Date(
                    evento.fecha_evento
                );

            const fechaFormateada =
                fecha.toLocaleDateString(
                    'es-MX',
                    {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }
                );

            contenedor.innerHTML += `

        <div
            class="card"
            data-id="${evento.id_gp}"
        >

            <h2>
                ${evento.nombre_gp}
            </h2>

            <p>
                Fecha:
                ${fechaFormateada}
            </p>

            <p>
                Hora:
                ${evento.hora_evento}
            </p>

        </div>

    `;
        });

        // EVENTOS CLICK PARA CADA CARD

        document
            .querySelectorAll('.card')
            .forEach(card => {

                card.addEventListener(
                    'click',
                    () => {

                        // OBTENER ID DEL GP

                        const id =
                            card.dataset.id;

                        console.log(id);

                        // REDIRECCIONAR

                        window.location.href =
                            `../html/buy-ticket.html?id=${id}`;
                    }
                );
            });

    } catch (error) {

        console.log(error);
    }
}

// EJECUTAR

cargarGP();