let productosEnCarrito = localStorage.getItem("productos-en-carrito-compras");
productosEnCarrito = JSON.parse(productosEnCarrito);

const container_carrito_vacio = document.querySelector("#carrito_vacio");
const container_carrito_products = document.querySelector("#carrito_products");
const container_carrito_acciones = document.querySelector("#carrito_acciones");
const container_carrito_comprado = document.querySelector("#carrito_comprado");
let buttonsDelete = document.querySelectorAll(".carrito-producto-delete");
const buttonVaciar = document.querySelector("#carrito-acciones-vaciar");
const container_total = document.querySelector("#total");
const buttonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {

    if(productosEnCarrito && productosEnCarrito.length > 0){

        container_carrito_vacio.classList.add("disabled");
        container_carrito_products.classList.remove("disabled");
        container_carrito_acciones.classList.remove("disabled");
        container_carrito_comprado.classList.add("disabled");
    
    
        container_carrito_products.innerHTML = "";
    
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-product");
            div.innerHTML = `
                <img class="carrito-product-image" src="${producto.imagen_producto}" alt="${producto.nombre_producto}">
                <div class="carrito-product-title">
                    <small>Nombre:</small>
                    <h3>${producto.nombre_producto}</h3>
                </div>
                <div class="carrito-product-cantidad">
                    <small>Cantidad:</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-product-price">
                    <small>Precio:</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-product-subtotal">
                    <small>Subtotal:</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-delete" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>    
            `; 
    
            container_carrito_products.append(div);
    
        });
    
    updateButtonDelete();
    actualizar_total();
    
    }else{
    
        container_carrito_vacio.classList.remove("disabled");
        container_carrito_products.classList.add("disabled");
        container_carrito_acciones.classList.add("disabled");
        container_carrito_comprado.classList.add("disabled");
    
    }
    
}

cargarProductosCarrito()

function updateButtonDelete() {
    buttonsDelete = document.querySelectorAll(".carrito-producto-delete");

    buttonsDelete.forEach(button => {
        button.addEventListener("click", eliminar_del_carrito);
    });
}

function eliminar_del_carrito(evento) {

    Toastify({
        text: "Producto eliminado",
        duration: 1000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to left, #5C5F4B, #B8A332)",
            borderRadius: "3rem",
            textTransform: "uppercase",
            fontSize: "0.65rem"
        },
        offset: {
            x: '2rem',
            y: '2rem'
        },

        onClick: function(){}
    }).showToast();

    const idbutton = evento.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idbutton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito-compras", JSON.stringify(productosEnCarrito));
}


buttonVaciar.addEventListener("click", vaciar_carrito);
function vaciar_carrito(){

    Swal.fire({
        title: '¿Esta seguro?',
        icon: 'question',
        html: `Se van a eliminar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'SI',
        cancelButtonText: 'NO',
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito-compras", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    });

};

function actualizar_total() {
    const total_calculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${total_calculado}`;
}


buttonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito-compras", JSON.stringify(productosEnCarrito));

    container_carrito_vacio.classList.add("disabled");
    container_carrito_products.classList.add("disabled");
    container_carrito_acciones.classList.add("disabled");
    container_carrito_comprado.classList.remove("disabled");
};

