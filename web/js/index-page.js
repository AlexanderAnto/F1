

const API =
    "https://f1-backend-t4mn.onrender.com/api/usuarios/login";


// ==========================
// LOGIN
// ==========================

document.getElementById(
    "login-form"
).addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        const correo =
            document.getElementById(
                "username"
            ).value;

        const password =
            document.getElementById(
                "password"
            ).value;

        try {

            const response =
                await fetch(API, {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        correo,
                        password
                    })
                });

            const resultado =
                await response.json();

            // ERROR

            if (!response.ok) {

                alert(
                    resultado.mensaje
                );

                return;
            }

            // GUARDAR SESIÓN

            localStorage.setItem(

                "usuario",

                JSON.stringify(
                    resultado.usuario
                )
            );

            // REDIRECCIONAR

            if (
                resultado.usuario.rol ===
                "Admin"
            ) {

                window.location.href =
                    "web/html/select-admin.html";

            } else {

                window.location.href =
                    "web/html/gp-selector.html";
            }

        } catch (error) {

            console.log(error);

            alert(
                "Error de conexión"
            );
        }
    }
);

// ==========================
// REGISTRO
// ==========================

document.getElementById(
    "add-button"
).addEventListener(
    "click",
    async function (e) {

        e.preventDefault();

        window.location.href =
            "web/html/new-user.html";
    }
);