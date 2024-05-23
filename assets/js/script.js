// Variables
const listaProductos = document.getElementById("lista-1");
const tablaCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
let carritoItems = [];

// Cargar los productos desde el JSON con Fetch
document.addEventListener("DOMContentLoaded", () => {
  fetch("./assets/js/script.json")
    .then((response) => response.json())
    .then((data) => {
      // Mostrar los productos una vez que se carguen
      mostrarProductos(data.productos);
    })
    .catch((error) => console.error("Error al cargar los productos:", error));
});

// Event Listeners
cargarEventListeners();

function cargarEventListeners() {
  // Se ejecuta cuando se presiona "Agregar al carrito"
  listaProductos.addEventListener("click", agregarProducto);

  // Se ejecuta cuando se presiona "Vaciar Carrito"
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  // Al cargar el documento, mostrar carrito almacenado en el Local Storage
  document.addEventListener("DOMContentLoaded", () => {
    carritoItems = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarCarrito();
  });
}

// Función para mostrar los productos en el HTML
function mostrarProductos(productos) {
  listaProductos.innerHTML = "";
  productos.forEach((producto) => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("product");
    divProducto.innerHTML = `
      <img src="${producto.imagen}" alt="" />
      <div class="product-txt">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio">$${producto.precio}</p>
        <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar al carrito</a>
      </div>
    `;
    listaProductos.appendChild(divProducto);
  });
}

// Función para agregar un producto al carrito
function agregarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const productoSeleccionado = e.target.parentElement.parentElement;
    leerDatosProducto(productoSeleccionado);
    mostrarMensaje("Producto agregado al carrito");
  }
}

// Lee los datos del producto
function leerDatosProducto(producto) {
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    nombre: producto.querySelector("h3").textContent,
    precio: producto.querySelector(".precio").textContent,
    id: producto.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = carritoItems.some((item) => item.id === infoProducto.id);

  if (existe) {
    // Se actualiza la cantidad
    const productos = carritoItems.map((item) => {
      if (item.id === infoProducto.id) {
        item.cantidad++;
        return item;
      } else {
        return item;
      }
    });
    carritoItems = [...productos];
  } else {
    // Se agrega el producto al carrito
    carritoItems = [...carritoItems, infoProducto];
  }

  // Se actualiza el carrito de compras
  actualizarCarrito();
}

// Elimina un producto del carrito
function eliminarProducto(e) {
  if (e.target.classList.contains("borrar-item")) {
    const productoId = e.target.getAttribute("data-id");

    // Elimina del arreglo de carritoItems por el data-id
    carritoItems = carritoItems.filter((item) => item.id !== productoId);

    // Se actualiza el carrito de compras
    actualizarCarrito();
  }
}

// Vaciar el carrito
function vaciarCarrito() {
  carritoItems = [];

  // Limpiar la tabla
  limpiarHTML();

  // Reiniciar el carrito en Local Storage
  localStorage.removeItem("carrito");
}

// Se actualiza el carrito de compras en el HTML
function actualizarCarrito() {
  // Limpiar el HTML
  limpiarHTML();

  // Recorrer el carrito y generar al HTML
  carritoItems.forEach((producto) => {
    const { imagen, nombre, precio, cantidad, id } = producto;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${imagen}" width="50" height="50"></td>
      <td>${nombre}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-item" data-id="${id}">X</a></td>
    `;
    tablaCarrito.appendChild(row);
  });

  // Agregar el carrito de compras al Local Storage
  guardarCarritoEnLocalStorage();

  // Agregar event listener para borrar productos individualmente
  document.querySelectorAll(".borrar-item").forEach((item) => {
    item.addEventListener("click", eliminarProducto);
  });
}

// Guardar carrito en Local Storage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carritoItems));
}

// Limpiar el HTML del carrito
function limpiarHTML() {
  while (tablaCarrito.firstChild) {
    tablaCarrito.removeChild(tablaCarrito.firstChild);
  }
}

// Función para mostrar un mensaje en pantalla ocupando la librería Toastify
function mostrarMensaje(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: "linear-gradient(to right, #4c105d, #96278f)",
    stopOnFocus: true,
    onClick: function () {},
  }).showToast();
}
