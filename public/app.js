async function cargarUsuarios() {
    try {
        const res = await fetch('http://localhost:5000/api/usuarios');
        if (res.ok) {
            const usuarios = await res.json();
            const listaUsuarios = document.getElementById('listaUsuarios');
            listaUsuarios.innerHTML = ''; 
            usuarios.forEach(usuario => {
                const li = document.createElement('li');
                li.textContent = Nombre: ${usuario.nombre}, Email: ${usuario.email};
                listaUsuarios.appendChild(li);
            });
        } else {
            console.error('Error al obtener usuarios');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
// Manejar el evento submit del formulario de registro
document.getElementById('registroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    const usuario = { nombre, email, contraseña };

    try {
        const res = await fetch('http://localhost:5000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (res.ok) {
            document.getElementById('mensaje').innerText = 'Usuario registrado con éxito';
            cargarUsuarios(); // Recargar la lista de usuarios después de registrar uno nuevo
        } else {
            const errorText = await res.text();
            document.getElementById('mensaje').innerText = Error al registrar usuario: ${errorText};
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('mensaje').innerText = 'Error en la conexión';
    }
});

// Llamar a cargarUsuarios al cargar la página para mostrar la lista de usuarios existente
cargarUsuarios();