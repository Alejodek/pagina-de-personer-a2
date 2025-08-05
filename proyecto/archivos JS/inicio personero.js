async function iniciarSesion() {
    const correo = document.getElementById('correo').value;
    const codigo = document.getElementById('codigo').value;
    const clave = document.getElementById('clave').value;

    if (!correo || !codigo || !clave) {
        alert('Por favor completa todos los campos');
        return;
    }

    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, codigo, clave })
    });

    if (res.ok) {
        alert('Inicio de sesión exitoso');
        window.location.href = 'pagina web personero.html';
    } else {
        alert('Credenciales incorrectas');
    }
    }
