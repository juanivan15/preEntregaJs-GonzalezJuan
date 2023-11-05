const productos = [
    { id: 1, nombre: "Teclado Redragon Kumara", precio: 40000, imagen: "../img/teclado.jpg"},
    { id: 2, nombre: "Auriculares Hyperx", precio: 50000, imagen: "../img/auris.webp" },
    { id: 3, nombre: "Mouse Logitech G305", precio: 25000, imagen: "../img/mouse.jpg" },
    { id: 4, nombre: "Monitor Gigabyte", precio: 100000, imagen: "../img/monitor.jpg" }
];

const disponibles = ["Teclado", "Auriculares", "Mouse", "Monitor"];

const productosContainer = document.getElementById("productosContainer");
const productosDisponibles = document.getElementById("productosDisponibles");
const carrito = document.getElementById("carrito");
const carritoProductos = document.getElementById("carritoProductos");
const totalCarrito = document.getElementById("totalCarrito");
const eliminarCarritoButton = document.getElementById("eliminarCarrito");
const confirmarPagoButton = document.getElementById("confirmarPago");

mostrarProductos();

function mostrarProductos() {
    for (const producto of productos) {
        const productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <p>${producto.nombre}</p>
            <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}">
            <br>
            <b>$${producto.precio}</b>
            <br>
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
    alert("Su producto fue agregado al carrito!");
}

eliminarCarritoButton.addEventListener("click", () => {
    eliminarCarrito();
    carrito.style.display = "none";
});

confirmarPagoButton.addEventListener("click", () => {
    confirmarPago();
});

function mostrarCarrito() {
    carrito.style.display = "block";  
}

function eliminarCarrito() {
    carritoProductos.innerHTML = ""; 
    totalCarrito.textContent = "0";  
    window.location.reload();   
}

function confirmarPago() {
    alert(`¡Su pago por $${totalCarrito.textContent} ha sido confirmado! Gracias por tu compra.`);
    window.location.reload();
}

