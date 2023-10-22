let precioProducto;
let total = 0;
let nombre = prompt("Bienvenido! Ingresá tu nombre:");
let saludo = "Hola";
let continuarCompra = true;
let productost = "";

function saludar(saludo, nombre) {
    alert(`${saludo} ${nombre}!`);
}

saludar(saludo, nombre);

let suma = 0;

function sumar(a, b) {
    suma = a + b;
    return suma;
}

let productos = [
    { id: 1, nombre: "Teclado Redragon Kumara", precio: 40000, imagen: "../img/teclado.jpg" },
    { id: 2, nombre: "Auriculares Hyperx", precio: 50000, imagen: "../img/auris.webp" },
    { id: 3, nombre: "Mouse Logitech G305", precio: 25000, imagen: "../img/mouse.jpg" },
    { id: 4, nombre: "Monitor Gigabyte", precio: 100000, imagen: "../img/monitor.jpg" }
];

function mostrarProductos() {
    for (producto of productos) {
        let div = document.createElement("div");
        div.innerHTML = `
          <p>${producto.nombre}</p>
          <b>$${producto.precio}</b>
          <img src="${producto.imagen}" alt="Imagen de ${producto.nombre}">
          <hr />
        `;
        document.body.append(div);
    }
}

alert(`Bienvenido a nuestra tienda de accesorios gamer!`);

const disponibles = ["teclado", "mouse", "auricular", "monitor"];

let disp = prompt("Ingresá el nombre del producto que te gustaría comprar para saber si está disponible en nuestra tienda.");

if (disponibles.includes(disp)) {
   alert("El producto está disponible. Continuá tu compra");

       while (continuarCompra) {
       let opcion = Number(prompt(`Ingresá el número del producto que deseas agregar al carrito:
        1-Auriculares Hyperx $50000;
        2-Teclado Redragon Kumara $40000;
        3-Mouse Logitech G305 $25000;
        4-Monitor Gigabyte $100000.
        Si deseas salir o ver tu carrito de compras, ingresá el número 9`));
        switch (opcion) {
            case 1:
                alert("Agregaste Auriculares Hyperx al carrito");
                productost += "Auriculares Hyperx\n";
                precioProducto = 50000;
                total = sumar(total, precioProducto);
                break;
            case 2:
                alert("Agregaste Teclado Redragon Kumara al carrito");
                productost += "Teclado Redragon Kumara\n";
                precioProducto = 40000;
                total = sumar(total, precioProducto);
                break;
            case 3:
                alert("Agregaste Mouse Logitech G305 al carrito");
                productost += "Mouse Logitech G305\n";
                precioProducto = 25000;
                total = sumar(total, precioProducto);
                break;
            case 4:
                alert("Agregaste Monitor Gigabyte al carrito");
                productost += "Monitor Gigabyte\n";
                precioProducto = 100000;
                total = sumar(total, precioProducto);
                break;
            case 9:
                continuarCompra = false;
                break;
            default:
                alert("Opción incorrecta. Por favor ingresá un número nuevamente.");
                break;
        }
    }

    if (productost === "") {
        alert("Tu carrito está vacío");
    } else {
        alert(`Productos en el carrito:\n${productost}`);
        alert(`El total de su compra es $${total}`);
    }
}
else {
      alert("Lamentamos no contar con ese producto en este momento. Por favor volvé pronto.");
}

alert("Gracias por utilizar nuestra página");
alert(`Nos vemos ${nombre}`);

mostrarProductos();




