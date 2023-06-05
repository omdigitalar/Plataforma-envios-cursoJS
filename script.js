const formulario = document.getElementById("formulario"); //Conectamos el JS con el ID formulario creado en el HTML.
const mensaje = document.getElementById("mensaje"); ////Conectamos el JS con el ID div creado en el HTML.
const verPedidosBtn = document.getElementById("ver-pedidos"); // Conectamos el js con el boton del html.
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || []; // Creamos el local storage para almacenar los pedidos.

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const pesoPedidoInput = document.getElementById("peso");
  const pesoPedido = parseInt(pesoPedidoInput.value);

  if (isNaN(pesoPedido)) {
    mensaje.innerText = "Inserte un peso válido"; // Si el peso no es un numero, devuelve "Inserte un peso válido"
  } else {
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const codigoPostal = document.getElementById("codigo").value;
    const dni = document.getElementById("dni").value;
    const montoPedido = parseInt(document.getElementById("monto").value);

    const envioGratis = montoPedido >= 15000; // Si el precio del pedido es mayor a 15.000 tienen envīo gratis.

    let montoEnvio;
    if (envioGratis) {
      montoEnvio = "Envío gratis";
    } else {
      const encontrado = valorEnvios.find((item) => item.peso >= pesoPedido); // Si es menor a 15.000 va hacia el array donde estan los precios por pesoPedido, para chequear el valor.
      montoEnvio = encontrado ? encontrado.precio : "N/A"; // En caso de que no tenga precio, xq es envío gratis, aparecerá N/A en lugar de null.
    }

    const pedido = { // Creamos el objeto del pedido con los datos que contienen.
      nombre,
      direccion,
      codigoPostal,
      dni,
      montoPedido,
      pesoPedido,
      montoEnvio,
    };

    pedidos.push(pedido); // Realizamos un push del pedido realizado hacia un array vacío que contiene los pedidos y se almacena en el localstorage.
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    mensaje.innerHTML = "Envío generado con éxito<br><button id='crear-otro-envio'>Crear otro envío</button>"; //Muestra el evento "Pedido creado con exito" y habilita el botón para crear un nuevo envío.

    document.getElementById("crear-otro-envio").addEventListener("click", function () { //Cuando apretan en "Crear otro envío" se limpia el formulario inicial.
      formulario.reset();
      mensaje.innerHTML = "";
    });
  }
});

verPedidosBtn.addEventListener("click", function () { // Si apretamos en el botón "Ver pedidos", muesta el contenido del array vacío que fuimos pusheando.
  const pedidosHTML = pedidos.map((pedido) => {
    const {
      nombre,
      direccion,
      codigoPostal,
      dni,
      montoPedido,
      pesoPedido,
      montoEnvio,
    } = pedido;

    return `
      <li class="pedido-card">
        <strong>Nombre</strong> ${nombre}<br>
        <strong>Dirección</strong> ${direccion}<br>
        <strong>Código Postal</strong> ${codigoPostal}<br>
        <strong>DNI</strong> ${dni}<br>
        <strong>Monto Pedido</strong> $${montoPedido}<br>
        <strong>Peso Pedido</strong> ${pesoPedido ? `${pesoPedido}kg` : "N/A"}<br>
        <strong>Monto Envío</strong> ${montoEnvio}<br>
      </li>
    `;
  }); //Nos devuelve unas cards, con los contenidos que va buscando a traves de los ${}.

  mensaje.innerHTML = `<ul>${pedidosHTML.join("")}</ul>`;
});

const valorEnvios = [ //Array con los precios de los envíos segun los pesos de los paquetes.
  { peso: 1, precio: 1000 },
  { peso: 2, precio: 1300 },
  { peso: 5, precio: 1500 },
  { peso: 10, precio: 2500 },
  { peso: 20, precio: 3500 },
];
