let productos = []
let carrito = []

async function obtenerProductos() {
    const response = await fetch("./productos.json")
    const data = await response.json()
    productos = data
}  

async function mostrarProductos(){
    await obtenerProductos()

    let contenedor = document.getElementById("contenedor-productos")

    let menu = productos.map( producto => `
            <div class="menu">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.nombre} - $${producto.precio}</p>
                <button class="buttom boton-carrito" data-nombre="${producto.nombre}">AGREGAR AL CARRITO</button>                
            </div>
        `
    ).join("")

    contenedor.innerHTML = menu

    document.querySelectorAll('.boton-carrito').forEach(button => {
        button.addEventListener('click', () => {
            agregarProducto(button.getAttribute('data-nombre'));
        });
    });
}

mostrarProductos()

function agregarProducto(nombre){
    const producto = productos.find( prod => prod.nombre == nombre)
    carrito.push(producto)

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function cargarCarrito(){
    let contenedorCarrito = document.querySelector("#contenedor-carrito")
    let carritoLocal = JSON.parse(localStorage.getItem("carrito")) || []    

    let productosCarrito = carritoLocal.map( producto => `            
            <div class="resumen">
                <img src="${producto.imagen}" alt=${producto.nombre}/>
                <p>${producto.nombre} $${producto.precio}</p>
            </div>           
        `).join("")
    
    let total = carritoLocal.reduce( (acu, producto) => acu + producto.precio, 0)
    console.log(total)
    contenedorCarrito.innerHTML =  productosCarrito
    
    if(total != 0){
        let tagTotal = document.createElement("p")
        tagTotal.innerText = "total a pagar " + total
        tagTotal.className = "total"
        contenedorCarrito.appendChild(tagTotal)
    }
}

cargarCarrito();

function pagar(){
    let formComprar = document.querySelector(".form-comprar")
    let carritoLocal = JSON.parse(localStorage.getItem("carrito"))

    let menu = carritoLocal.map(producto => `
            <label for=${producto.nombre}>${producto.nombre}</label>
            <input
                id=${producto.nombre}
                name=${producto.nombre}
                value=${producto.nombre}+${producto.precio}
            />
            
    `).join("")

    formComprar.addEventListener("click", () => {
        formComprar.innerHTML = menu
    })
}

function vaciarCarrito(){
    localStorage.clear()

    let contenedorCarrito = document.querySelector("#contenedor-carrito")
    contenedorCarrito.innerHTML = ""
}





