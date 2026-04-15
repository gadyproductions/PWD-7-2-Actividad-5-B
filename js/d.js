// 1. captura de los elementos html
const form = document.getElementById('dataForm');
const emailInput = document.getElementById('correo');
const fotoInput = document.getElementById('foto');
const imgPreview = document.getElementById('imgPreview');
const emailError = document.getElementById('emailError');

// 2. validacion en tiempo real 
// El evento 'input' se dispara cada vez que tocás una tecla en ese campo
emailInput.addEventListener('input', () => {
    // Si el valor NO incluye un arroba (@)...
    if (!emailInput.value.includes('@')) {
        emailInput.classList.remove('borde-verde');
        emailInput.classList.add('borde-rojo');
        emailError.textContent = "El correo debe tener un @";
    } else {
        // Si está todo bien...
        emailInput.classList.remove('borde-rojo');
        emailInput.classList.add('borde-verde');
        emailError.textContent = ""; // Borramos el mensaje de error
    }
});

// 3. preview de imagen 
// El evento 'change' detecta cuando elegiste un archivo
fotoInput.addEventListener('change', function() {
    const archivo = this.files[0]; // Agarramos el primer archivo que subió
    
    if (archivo) {
        const reader = new FileReader(); // Creamos el lector de archivos
        
        // Cuando termina de leer el archivo se ejecuta esto:
        reader.addEventListener('load', function() {
            imgPreview.src = this.result; // Le pasamos el archivo leído a la etiqueta <img>
            imgPreview.style.display = 'block'; // Hacemos que la imagen sea visible
        });
        
        reader.readAsDataURL(archivo); // Ordenamos que lea el archivo como si fuera una URL de datos
    } else {
        imgPreview.style.display = 'none'; // Si canceló ocultamos la imagen
    }
});

// 4. simular envio 
form.addEventListener('submit', (evento) => {
    // Evitamos que la página se recargue
    evento.preventDefault(); 
    
    // Chequeo de seguridad final
    if (!emailInput.value.includes('@')) {
        alert("Corregí el correo antes de enviar");
        return; 
    }

    // Armamos el Objeto JSON con los datos capturados
    const datosRecopilados = {
        proyecto: "Proyecto SIMC", 
        id_equipo: document.getElementById('equipoId').value,
        correo_responsable: emailInput.value,
        fecha_registro: new Date().toLocaleDateString()
    };

    // Mostramos por consola cómo queda el JSON 
    console.log("Datos listos para enviar por POST:", JSON.stringify(datosRecopilados));

    // 5. Mostrar alerta
    Toastify({
        text: "¡Datos guardados exitosamente!",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();

    // Limpiamos el formulario para que quede listo para otro ingreso
    form.reset();
    imgPreview.style.display = 'none';
    emailInput.classList.remove('borde-verde', 'borde-rojo');
});