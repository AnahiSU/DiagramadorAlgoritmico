import { crearProceso } from "./procesos.js";
import { crearEntrada } from "./entrada.js";
import { crearSalida } from "./salida.js";
import { crearDecision } from "./decisiones.js";

const canvas = document.getElementById("svg-canva");
const figuras = [];
let figuraSeleccionada = null;
let offsetX = 0, offsetY = 0;


document.getElementById("procedimiento").addEventListener("click", () => {
  const id = "proceso" + (figuras.length + 1);
  let x = 100;
  let y = 100;
  let texto = "Proceso";
  crearProceso(canvas,x, y, texto, id);

  figuras.push({ id, tipo: "proceso", x, y, width: 120, height: 60, texto });
});

document.getElementById("entrada").addEventListener("click", () => {
  const id = "proceso" + (figuras.length + 1);
  let x = 200;
  let y = 200;
  let texto = "Entrada"; 
  crearEntrada(canvas,x, y, texto, id);
  
  figuras.push({ id, tipo: "entrada", x, y, width: 120, height: 60, texto });
});

document.getElementById("salida").addEventListener("click", () => {
  const id = "proceso" + (figuras.length + 1);
  let x = 300;
  let y = 300;
  let texto = "Salida";
  crearSalida(canvas,x, y, texto, id);
  
  figuras.push({ id, tipo: "salida", x, y, width: 120, height: 60, texto });
});

document.getElementById("decision").addEventListener("click", () => {
  const id = "proceso" + (figuras.length + 1);
  let x = 400;
  let y = 400;
  let texto = "Decisión";
  crearDecision(canvas,x, y, texto, id);
  
  figuras.push({ id, tipo: "decision", x, y, width: 120, height: 60, texto });
});


function iniciarMovimiento(e) {
  const target = e.target.closest("g"); 
  if (!target) return;

  figuraSeleccionada = target;

  const transform = figuraSeleccionada.getAttribute("transform");
  const [, x, y] = /translate\(([-\d.]+),\s*([-\d.]+)\)/.exec(transform) || [0, 0, 0];

  offsetX = e.clientX - parseFloat(x);
  offsetY = e.clientY - parseFloat(y);
}

function moverFigura(e) {
  if (!figuraSeleccionada) return;

  const newX = e.clientX - offsetX + 30;
  const newY = e.clientY - offsetY + 30;

  figuraSeleccionada.setAttribute("transform", `translate(${newX}, ${newY})`);
}

function soltarFigura() {
  figuraSeleccionada = null;
}

export { iniciarMovimiento, moverFigura, soltarFigura };