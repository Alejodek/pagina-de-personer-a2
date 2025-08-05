function votarEnBlanco(cargo) {
    const claveLocal = `voto_blanco_${cargo.toLowerCase()}`;

    if (localStorage.getItem(claveLocal)) {
        alert(`Ya has votado en blanco para el cargo de ${cargo}. No puedes volver a votar.`);
        return;
    }

    const confirmacion = confirm(`¿Estás seguro que deseas votar en blanco para el cargo de ${cargo}?`);

    if (confirmacion) {
        fetch('http://localhost:3000/votar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                candidato: 'Voto en blanco',
                cargo: cargo,
                timestamp: new Date().toISOString()
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.mensaje || `Tu voto en blanco para ${cargo} ha sido registrado.`);
            localStorage.setItem(claveLocal, 'true');
        })
        .catch(err => {
            console.error(err);
            alert('Hubo un error al registrar tu voto. Intenta de nuevo.');
        });
    }
}