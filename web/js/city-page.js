import { initModal } from './script-aux.js';

const forms = document.getElementById('gradaForm');

forms.addEventListener(
    'submit',
    async (e) => {
        e.preventDefault();
        const grada = {
            nombre_grada: document.getElementById('name_grada').value,
            color: document.getElementById('color-grada').value,
            precio: document.getElementById('precio-grada').value
        };

        try {
            const response =
                await fetch('f1-backend-t4mn.onrender.com/api/gradas',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },
                        body: JSON.stringify(
                            grada
                        )
                    }

                );

            const data =
                await response.json();

            console.log(data);

            alert('Usuario registrado');

        }catch (error) {

            console.log(error);
        }
    }

);

const selectColor =
    document.getElementById(
        'color-grada'
    );

async function cargarColores() {

    try {

        const response =
            await fetch(
                'https://f1-backend-t4mn.onrender.com/api/gradas/colores'
            );

        const colores =
            await response.json();

        console.log(colores);

        colores.forEach(color => {

            selectColor.innerHTML += `
                <option value="${color}">
                    ${color}
                </option>
            `;
        });

    } catch (error) {

        console.log(error);
    }
}

cargarColores();
initModal();

