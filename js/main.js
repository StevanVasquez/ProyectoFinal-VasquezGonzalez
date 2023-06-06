let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarLosProductos(productos);
    });

const containerProducts = document.querySelector("#container_products");
const buttonCategories = document.querySelectorAll(".button-category");
const titlePrincipal = document.querySelector("#title_principal");
let buttonsAgregar = document.querySelectorAll(".producto-agregar"); 
const numeritoCarrito = document.querySelector("#numerito_carrito"); 


buttonCategories.forEach(button => button.addEventListener("click", () => {
    aside.classList.remove("aside_visible");
}));


function cargarLosProductos(productosSeleccionados){

    containerProducts.innerHTML = "";

    productosSeleccionados.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen"src="${producto.imagen_producto}" alt="${producto.nombre_producto}">

            <div class="productos-detalles">
                <h3 class="product-title">${producto.nombre_producto}</h3>
                <p class="product-price">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        containerProducts.append(div);
    });

    updateButtonAgregar();
};


buttonCategories.forEach(button => {
    button.addEventListener("click", (evento) => {

        buttonCategories.forEach(button => button.classList.remove("active"));
        evento.currentTarget.classList.add("active");

        if(evento.currentTarget.id != "todos"){
            const productCategorie = productos.find(producto => producto.categoria.id === evento.currentTarget.id);
            titlePrincipal.innerText = productCategorie.categoria.nombre;

            const productsButton = productos.filter(producto => producto.categoria.id === evento.currentTarget.id)
            cargarLosProductos(productsButton);
        }else{
            titlePrincipal.innerText = "Todos los productos";
            cargarLosProductos(productos);
        }
        

    });
});

function updateButtonAgregar() {
    buttonsAgregar = document.querySelectorAll(".producto-agregar");

    buttonsAgregar.forEach(button => {
        button.addEventListener("click", agregarAlCarro);
    });
}

let productsEnCarrito;

let productosEnCarritoLocalStorage = localStorage.getItem("productos-en-carrito-compras");

if(productosEnCarritoLocalStorage) {

    productsEnCarrito = JSON.parse(productosEnCarritoLocalStorage);
    updateNumerito();

}else{
    productsEnCarrito = [];
}


function agregarAlCarro(evento) {

    Toastify({
        text: "Agregado al carrito",
        duration: 1000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to left, #5C5F4B, #B8A332)",
            borderRadius: "3rem",
            textTransform: "uppercase",
            fontSize: "0.55rem"
        },
        offset: {
            x: '2rem',
            y: '2rem'
        },

        onClick: function(){} // Callback after click
    }).showToast();

    const idButton = evento.currentTarget.id;
    const producto_agregado = productos.find(producto => producto.id === idButton);

    if(productsEnCarrito.some(producto => producto.id === idButton)){
        const index = productsEnCarrito.findIndex(producto => producto.id === idButton);
        productsEnCarrito[index].cantidad++;
    }else{
        producto_agregado.cantidad = 1;
        productsEnCarrito.push(producto_agregado);
    }
    
    updateNumerito();

    localStorage.setItem("productos-en-carrito-compras", JSON.stringify(productsEnCarrito));

}

function updateNumerito() {
    let newNumerito = productsEnCarrito.reduce((acc, product) => acc + product.cantidad, 0);
    numeritoCarrito.innerText = newNumerito;
}

