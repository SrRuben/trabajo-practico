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