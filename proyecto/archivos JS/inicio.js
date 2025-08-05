
document.addEventListener("DOMContentLoaded", function () {
const loginButton = document.querySelector("#button button");
const emailInput = document.querySelectorAll("#info")[0];
const passwordInput = document.querySelectorAll("#info")[1];

loginButton.addEventListener("click", function (event) {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
    event.preventDefault();
    alert("Por favor completa ambos campos: correo y contraseña.");
    } else {
    alert("¡Inicio de sesión exitoso!");
    }
});
});
