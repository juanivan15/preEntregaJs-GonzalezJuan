const productos = [
    { id: 1, nombre: "Teclado Redragon Kumara", precio: 40000, imagen: "../img/teclado.jpg"},
    { id: 2, nombre: "Auriculares Hyperx", precio: 50000, imagen: "../img/auris.webp" },
    { id: 3, nombre: "Mouse Logitech G305", precio: 25000, imagen: "../img/mouse.jpg" },
    { id: 4, nombre: "Monitor Gigabyte", precio: 100000, imagen: "../img/monitor.jpg" }
];

const disponibles = ["Teclado Redragon Kumara", "Auriculares Hyperx", "Mouse Logitech G305", "Monitor Gigabyte"];

const nombreInput = document.getElementById("nombreInput");
const saludarButton = document.getElementById("saludarButton");
const productosContainer = document.getElementById("productosContainer");
const productosDisponibles = document.getElementById("productosDisponibles");
const carrito = document.getElementById("carrito");
const carritoProductos = document.getElementById("carritoProductos");
const totalCarrito = document.getElementById("totalCarrito");
const verificarCarrito = document.getElementById("verificarCarrito");

saludarButton.addEventListener("click", () => {
    const nombre = nombreInput.value;
    if (nombre) {
        saludar(nombre);
        productosDisponibles.style.display = "block";
        mostrarProductos();
    } else {
        alert("Por favor, ingresa tu nombre.");
    }
});

function mostrarCarrito() {
    carrito.style.display = "block";
}

verificarCarrito.addEventListener("click", () => {
    mostrarCarrito();
});

function saludar(nombre) {
    alert(`¡Hola ${nombre}!`);
}

function mostrarProductos() {
    for (const producto of productos) {
        const productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <p>${producto.nombre}</p>
            <b>$${producto.precio}</b>
            <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}">
            <button class="agregarCarrito" data-producto='${JSON.stringify(producto)}'>Agregar al Carrito</button>
            <hr />
        `;
        productosContainer.appendChild(productoDiv);
    }
    productosContainer.querySelectorAll(".agregarCarrito").forEach((boton) => {
        boton.addEventListener("click", () => {
            const producto = JSON.parse(boton.getAttribute("data-producto"));
            agregarAlCarrito(producto);
        });
    });
}

function agregarAlCarrito(producto) {
    carritoProductos.innerHTML += `<li>${producto.nombre} - $${producto.precio}</li>`;
    const totalActual = parseInt(totalCarrito.textContent);
    totalCarrito.textContent = totalActual + producto.precio;
}

