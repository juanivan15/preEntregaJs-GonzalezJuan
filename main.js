let precioProducto;
let total = 0;
let nombre = (prompt("Ingrese su nombre"));
let saludo = ("Bienvenido");
let continuarCompra = true;
let productos = "";

function saludar(saludo, nombre){
    alert(`${saludo} ${nombre}`);
}
saludar(saludo, nombre);

let suma = 0;

function sumar(a, b) {
    suma = a + b;  
    return suma;
}


alert("Tenemos para ofrecerte los siguientes productos");

function mostrarProductos(){
    alert(`
    Ingrese el numero del producto que quiere comprar:
    1-Auriculares Hyperx $50000;
    2-Teclado Redragon Kumara $40000;
    3-Mouse Logitech G305 $25000;
    4-Monitor Gigabyte $100000;
    Si desea salir o ver su carrito de compras, ingrese el número 9`);
}


mostrarProductos();




while(continuarCompra){
    let opcion = Number(prompt("Ingrese el producto que desea agregar al carrito"));
    switch (opcion) {
        case 1:
            alert("Usted agregó Auriculares Hyperx");
            productos += "Auriculares Hyperx\n";
            precioProducto = 50000;
            total = (sumar(suma, precioProducto));
            mostrarProductos();
        break;
        case 2:
            alert("Usted agregó Teclado Redragon Kumara");
            productos += "Teclado Redragon Kumara\n";
            precioProducto = 40000;
            total = (sumar(suma, precioProducto));
            mostrarProductos();
        break;
        case 3:
            alert("Usted agregó Mouse Logitech G305");
            productos += "Mouse Logitech G305\n";
            precioProducto = 25000;
            total = (sumar(suma, precioProducto));
            mostrarProductos();
        break;
        case 4:
            alert("Usted agregó Monitor Gigabyte");
            productos += "Monitor Gigabyte\n";
            precioProducto = 100000;
            total = (sumar(suma, precioProducto));
            mostrarProductos();
        break;
        case 9:
            continuarCompra = false;
        break;

        default:
            alert("Opcion incorrecta. Por favor ingrese un numero nuevamente");
            mostrarProductos();
            break;
    }
}
if(productos == ""){
    alert("Usted no tiene productos en el carrito");
}
else{
    alert(`Productos en el carrito:\n${productos}`);
    alert(`El total de su compra es $${total}`);
}
alert("Gracias por utilizar nuestra página");
alert(`Hasta luego ${nombre}`);



