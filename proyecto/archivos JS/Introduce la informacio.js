document.getElementById("formulario").addEventListener("submit", async function (e) {e.preventDefault();

const nombre = document.getElementById("nombre").value.trim();
const email = document.getElementById("email").value.trim();
const propuestas = document.getElementById("propuestas").value.trim();
const fileInput = document.getElementById("foto");
const file = fileInput.files[0];

if (!nombre || !email || !propuestas || !file) {
    alert("Por favor, completa todos los campos.");
    return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    alert("Correo electrónico inválido.");
    return;
}

const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

const fotoBase64 = await getBase64(file);

const postulacion = {
    nombre,
    email,
    foto: fotoBase64,
    cargo: "Personero",
    propuestas
};

try {
    const res = await fetch("http://localhost:3000/postular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postulacion)
    });

    const data = await res.json();
    alert(data.mensaje);

    if (res.ok) {
        window.location.href = "index.html";
    }
} catch (error) {
    alert("Error al enviar la postulación.");
}
});