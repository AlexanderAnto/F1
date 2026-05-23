// ==========================
// API
// ==========================

const API =
    'https://f1-backend-t4mn.onrender.com/api/usuarios';


// ==========================
// HTML
// ==========================

const form =
    document.getElementById(
        'newUserForm'
    );

const countriesSelect =
    document.getElementById(
        'paises'
    );

const password =
    document.getElementById(
        'password'
    );

const confirmPassword =
    document.getElementById(
        'confirmPassword'
    );

const estadoPassword =
    document.getElementById(
        'estado_contraseña'
    );


// ==========================
// MENSAJES
// ==========================

let messageContainer =
    document.getElementById(
        'form-message'
    );

if (!messageContainer) {

    messageContainer =
        document.createElement(
            'div'
        );

    messageContainer.id =
        'form-message';

    messageContainer.style.marginTop =
        '15px';

    messageContainer.style.padding =
        '10px';

    messageContainer.style.borderRadius =
        '5px';

    form.insertAdjacentElement(
        'afterend',
        messageContainer
    );
}


// ==========================
// CARGAR PAISES
// ==========================

async function loadCountries() {

    try {

        const response =
            await fetch(
                'https://restcountries.com/v3.1/all?fields=name'
            );

        if (!response.ok) {

            throw new Error(
                'Error al cargar países'
            );
        }

        const countries =
            await response.json();

        countries.sort(
            (a, b) =>

                a.name.common.localeCompare(
                    b.name.common
                )
        );

        countries.forEach(country => {

            const option =
                document.createElement(
                    'option'
                );

            option.value =
                country.name.common;

            option.textContent =
                country.name.common;

            countriesSelect.appendChild(
                option
            );
        });

    } catch (error) {

        console.log(error);

        messageContainer.textContent =
            'No se pudieron cargar los países';

        messageContainer.style.backgroundColor =
            '#f8d7da';

        messageContainer.style.color =
            '#721c24';
    }
}

loadCountries();


// ==========================
// MOSTRAR CONTRASEÑA
// ==========================

estadoPassword.addEventListener(
    'change',
    () => {

        if (
            estadoPassword.checked
        ) {

            password.type = 'text';

            confirmPassword.type = 'text';

        } else {

            password.type =
                'password';

            confirmPassword.type =
                'password';
        }
    }
);


// ==========================
// CREAR USUARIO
// ==========================

form.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        try {

            // VALIDAR PASSWORDS

            if (
                password.value !==
                confirmPassword.value
            ) {

                messageContainer.textContent =
                    'Las contraseñas no coinciden';

                messageContainer.style.backgroundColor =
                    '#f8d7da';

                messageContainer.style.color =
                    '#721c24';

                return;
            }

            // DATOS

            const datos = {

                nombre:
                    document.getElementById(
                        'name'
                    ).value,

                apellido:
                    document.getElementById(
                        'apellido'
                    ).value,

                correo:
                    document.getElementById(
                        'email'
                    ).value,

                telefono:
                    document.getElementById(
                        'telefono'
                    ).value,

                direccion:
                    document.getElementById(
                        'direccion'
                    ).value,

                pais:
                    countriesSelect.value,

                password_usuario:
                    password.value,

                // ROL FIJO

                rol:
                    'user'
            };

            console.log(datos);

            // FETCH

            const response =
                await fetch(API, {

                    method: 'POST',

                    headers: {

                        'Content-Type':
                            'application/json'
                    },

                    body:
                        JSON.stringify(
                            datos
                        )
                });

            const resultado =
                await response.json();

            console.log(resultado);

            // ERROR

            if (!response.ok) {

                messageContainer.textContent =
                    resultado.error ||
                    'Error al crear usuario';

                messageContainer.style.backgroundColor =
                    '#f8d7da';

                messageContainer.style.color =
                    '#721c24';

                return;
            }

            // EXITO

            // EXITO

            messageContainer.textContent =
                'Usuario creado correctamente';

            messageContainer.style.backgroundColor =
                '#d4edda';

            messageContainer.style.color =
                '#155724';

            form.reset();

            // REDIRECCION AL LOGIN
            setTimeout(() => {

                window.location.href =
                    '../../index.html';

            }, 1500);

        } catch (error) {

            console.log(error);

            messageContainer.textContent =
                'Error de conexión';

            messageContainer.style.backgroundColor =
                '#f8d7da';

            messageContainer.style.color =
                '#721c24';
        }
    }
);
