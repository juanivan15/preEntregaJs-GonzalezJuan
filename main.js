const productos = [
    { id: 1, nombre: "Teclado Redragon Kumara", precio: 40000, imagen: "./img/teclado.jpg"},
    { id: 2, nombre: "Auriculares Hyperx", precio: 50000, imagen: "./img/auris.webp" },
    { id: 3, nombre: "Mouse Logitech G305", precio: 25000, imagen: "./img/mouse.jpg" },
    { id: 4, nombre: "Monitor Gigabyte", precio: 100000, imagen: "./img/monitor.jpg" }
];

const disponibles = ["teclado", "auriculares", "mouse", "monitor"];

const productosContainer = document.getElementById("productosContainer");
const productosDisponibles = document.getElementById("productosDisponibles");
const carrito = document.getElementById("carrito");
const carritoProductos = document.getElementById("carritoProductos");
const totalCarrito = document.getElementById("totalCarrito");
const eliminarCarritoButton = document.getElementById("eliminarCarrito");
const confirmarPagoButton = document.getElementById("confirmarPago");
const buscadorInput = document.getElementById("buscadorInput");
const buscarBoton = document.getElementById("buscarBoton");
const resultadosBusqueda = document.getElementById("resultadosBusqueda");


let carritoEnLocalStorage = JSON.parse(localStorage.getItem("carrito")) || [];
actualizarCarritoEnPantalla();

buscarBoton.addEventListener("click", function () {
    const terminoDeBusqueda = buscadorInput.value.toLowerCase();
    realizarBusqueda(terminoDeBusqueda);
});

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
    carritoEnLocalStorage.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carritoEnLocalStorage));
    actualizarCarritoEnPantalla();
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "El producto fue agregado al carrito!",
        showConfirmButton: false,
        timer: 1500
      });;
}

function eliminarProductoDelCarrito(index) {
    Swal.fire({
        title: "Estás seguro que quieres eliminar el producto del carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "El producto fue eliminado del carrito!",
            icon: "success"
          });
          carritoEnLocalStorage.splice(index, 1);
          localStorage.setItem("carrito", JSON.stringify(carritoEnLocalStorage));
          actualizarCarritoEnPantalla();
        }
      });
}

eliminarCarritoButton.addEventListener("click", () => {
    eliminarCarrito();
});

confirmarPagoButton.addEventListener("click", () => {
    confirmarPago();
});

function mostrarCarrito() {
    carrito.style.display = "block";  
}

function eliminarCarrito() {
    Swal.fire({
        title: "Estás seguro que quieres eliminar el carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado!",
            text: "El carrito fue vaciado.",
            icon: "success"
        });
        carritoEnLocalStorage = [];
        localStorage.setItem("carrito", JSON.stringify(carritoEnLocalStorage));
        actualizarCarritoEnPantalla();
        }
      });
  
}

function confirmarPago() {
    alert(`¡Su pago por $${totalCarrito.textContent} ha sido confirmado! Gracias por tu compra.`);
    carritoEnLocalStorage = [];
    localStorage.setItem("carrito", JSON.stringify(carritoEnLocalStorage));
    actualizarCarritoEnPantalla();
}

function realizarBusqueda(termino) {
    resultadosBusqueda.innerHTML = "";
    const resultados = disponibles.filter(producto => producto.toLowerCase().includes(termino));
    if (resultados.length === 0) {
        resultadosBusqueda.innerHTML = "<li>No se encontraron resultados.</li>";
    } else {
        resultados.forEach(resultado => {
            const itemResultado = document.createElement("li");
            itemResultado.textContent = "El producto se encuentra disponible";
            resultadosBusqueda.appendChild(itemResultado);
        });
    }
}

function actualizarCarritoEnPantalla() {
    carritoProductos.innerHTML = "";
    let totalActual = 0;

    for (let i = 0; i < carritoEnLocalStorage.length; i++) {
        const producto = carritoEnLocalStorage[i];
        const listItem = document.createElement("li");
        listItem.innerHTML = `<label for="producto${i}">${producto.nombre} - $${producto.precio}</label>
                              <button class="eliminarProducto" data-index="${i}">Eliminar</button>`;
        carritoProductos.appendChild(listItem);
        totalActual += producto.precio;
    }

    totalCarrito.textContent = totalActual;

    carritoProductos.querySelectorAll('.eliminarProducto').forEach((boton) => {
        boton.addEventListener("click", () => {
            const index = parseInt(boton.getAttribute("data-index"));
            eliminarProductoDelCarrito(index);
        });
    });
}
