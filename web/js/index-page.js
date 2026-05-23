const API =
    "https://f1-backend-t4mn.onrender.com/api/usuarios";


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
                await fetch(API);

            const usuarios =
                await response.json();

            // BUSCAR USUARIO

            const usuario =
                usuarios.find(
                    (u) =>

                        u.correo === correo &&
                        u.password_usuario === password
                );

            // VALIDAR

            if (!usuario) {

                alert(
                    "Correo o contraseña incorrectos"
                );

                return;
            }

            // GUARDAR SESIÓN

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuario)
            );

            // REDIRECCIÓN SEGÚN ROL

            if (
                usuario.rol === "Admin"
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