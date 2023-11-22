const urlJSON = './db.json';

const disponibles = ["teclado", "auriculares", "mouse", "monitor"];
const productosContainer = document.getElementById("productosContainer");
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

async function obtenerProductos() {
  try {
    const response = await fetch(urlJSON);
    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de productos');
    }
    const data = await response.json();
    return data.productos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
}

async function iniciarApp() {
  try {
    const productos = await obtenerProductos();
    if (productos.length > 0) {
      mostrarProductos(productos);
    } else {
      console.error('No se encontraron productos');
    }
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
  }
}

function mostrarProductos(productos) {
  productos.forEach((producto) => {
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
  });

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
    });
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
  if(totalCarrito.textContent != 0){
    Swal.fire({
        title: "Estás seguro que quieres eliminar los productos del carrito?",
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
  } else {
    Swal.fire({
      title: "No tiene productos en el carrito!",
      icon: "warning"
    });
    }
}


function confirmarPago() {
  if(totalCarrito.textContent != 0){
    Swal.fire({
      title: "Quieres confirmar la compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, confirmar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `¡Su pago por $${totalCarrito.textContent} ha sido confirmado! Gracias por tu compra.`,
          text: "Vuelva pronto.",
          icon: "success"
      });
      carritoEnLocalStorage = [];
      localStorage.setItem("carrito", JSON.stringify(carritoEnLocalStorage));
      actualizarCarritoEnPantalla();
      }
    });
  } else {
    Swal.fire({
      title: "No tiene productos en el carrito!",
      icon: "warning"
  });
  }
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

document.addEventListener('DOMContentLoaded', iniciarApp);
