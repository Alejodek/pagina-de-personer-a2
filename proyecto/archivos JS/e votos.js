document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("http://localhost:3000/candidatos");
    const candidatos = await res.json();

    const container = document.getElementById("estadisticas");
    container.innerHTML = "";

    if (!candidatos.length) {
        container.innerHTML = "<p>No hay candidatos registrados aún.</p>";
        return;
    }

    candidatos.forEach(c => {
        const div = document.createElement("div");
        div.style.border = "1px solid #ccc";
        div.style.margin = "10px";
        div.style.padding = "10px";

        div.innerHTML = `
            <h2>${c.nombre}</h2>
            <p><strong>Cargo:</strong> ${c.cargo}</p>
            <p><strong>Propuestas:</strong> ${c.propuestas}</p>
            <p><strong>Total de votos:</strong> ${c.total_votos}</p>
        `;

        container.appendChild(div);
    });
});
