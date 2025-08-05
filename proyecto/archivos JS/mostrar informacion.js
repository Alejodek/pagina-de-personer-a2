document.addEventListener("DOMContentLoaded", async () => {
    const esPersonero = location.pathname.includes("personero");
    const cargo = esPersonero ? "Personero" : "Contralor";

try {
    const res = await fetch("http://localhost:3000/candidatos");
    const candidatos = await res.json();

    const contenedor = document.querySelector(".block-level");
    contenedor.innerHTML = "";

    const filtrados = candidatos.filter(c => c.cargo === cargo);

    if (filtrados.length === 0) {
        contenedor.innerHTML = `<p>No hay candidatos registrados para el cargo de ${cargo}.</p>`;
        return;
    }

    filtrados.forEach(c => {
        const div = document.createElement("div");
        div.className = "block-level__item";

    div.innerHTML = `
        <div class="tarjeta">
            <img src="${c.foto}" alt="Foto de ${c.nombre}" class="foto-candidato">
            <h2>${c.nombre}</h2>
            <p><strong>Propuesta:</strong> ${c.propuestas}</p>
            <p><strong>Votos:</strong> ${c.total_votos}</p>
            <button class="n" onclick="votar('${c.nombre}', '${cargo}')">Votar</button>
        </div>`;

        contenedor.appendChild(div);
    });
} catch (err) {
    console.error("Error al cargar candidatos:", err);
    alert("❌ No se pudieron cargar los candidatos.");
}
});

function votar(nombre, cargo) {
const clave = `voto_${cargo.toLowerCase()}`;
if (localStorage.getItem(clave)) {
    alert(`⚠️ Ya has votado para el cargo de ${cargo}.`);
    return;
}

fetch("http://localhost:3000/votar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidato: nombre })
})
    .then(res => res.json())
    .then(data => {
        alert(data.mensaje || "✅ Voto registrado");
        localStorage.setItem(clave, "true");
        location.reload();
    })
    .catch(() => alert("❌ Error al registrar el voto"));
}