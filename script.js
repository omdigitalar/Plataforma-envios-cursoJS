const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");
const verPedidosBtn = document.getElementById("ver-pedidos");
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const pesoPedidoInput = document.getElementById("peso");
  const pesoPedido = parseInt(pesoPedidoInput.value);

  if (isNaN(pesoPedido)) {
    mensaje.innerText = "Inserte un peso válido";
  } else {
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const codigoPostal = document.getElementById("codigo").value;
    const dni = document.getElementById("dni").value;
    const montoPedido = parseInt(document.getElementById("monto").value);

    const envioGratis = montoPedido >= 15000;

    let montoEnvio;
    if (envioGratis) {
      montoEnvio = "Envío gratis";
    } else {
      const encontrado = valorEnvios.find((item) => item.peso >= pesoPedido);
      montoEnvio = encontrado ? encontrado.precio : "N/A";
    }

    const pedido = {
      nombre,
      direccion,
      codigoPostal,
      dni,
      montoPedido,
      pesoPedido,
      montoEnvio,
    };

    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    mensaje.innerHTML = "Envío generado con éxito<br><button id='crear-otro-envio'>Crear otro envío</button>";

    document.getElementById("crear-otro-envio").addEventListener("click", function () {
      formulario.reset();
      mensaje.innerHTML = "";
    });
  }
});

verPedidosBtn.addEventListener("click", function () {
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
        <strong>Nombre:</strong> ${nombre}<br>
        <strong>Dirección:</strong> ${direccion}<br>
        <strong>Código Postal:</strong> ${codigoPostal}<br>
        <strong>DNI:</strong> ${dni}<br>
        <strong>Monto Pedido:</strong> $${montoPedido}<br>
        <strong>Peso Pedido:</strong> ${pesoPedido ? `${pesoPedido}kg` : "N/A"}<br>
        <strong>Monto Envío:</strong> ${montoEnvio}<br>
      </li>
    `;
  });

  mensaje.innerHTML = `<ul>${pedidosHTML.join("")}</ul>`;
});

const valorEnvios = [
  { peso: 1, precio: 1000 },
  { peso: 2, precio: 1300 },
  { peso: 5, precio: 1500 },
  { peso: 10, precio: 2500 },
  { peso: 20, precio: 3500 },
];
