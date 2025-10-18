import { crearProceso } from "./figuras/procesos.js";
import { crearEntrada } from "./figuras/entrada.js";
import { crearSalida } from "./figuras/salida.js";
import { crearDecision } from "./figuras/decisiones.js";

const canvas = document.getElementById("svg-canva");
const figuras = [];
let figuraSeleccionada = null;
let offsetX = 0, offsetY = 0;


document.getElementById("procedimiento").addEventListener("click", () => {
  let x = 100;
  let y = 100;
  crearProceso(canvas,x, y, "Proceso", figuras.length);

  figuras.push({ id, tipo: "proceso", x, y, width: 120, height: 60, texto });
});

document.getElementById("entrada").addEventListener("click", () => {
  let x = 200;
  let y = 200;
  crearEntrada(canvas,x, y, "Entrada", figuras.length);
  
  figuras.push({ id, tipo: "entrada", x, y, width: 120, height: 60, texto });
});

document.getElementById("salida").addEventListener("click", () => {
  let x = 300;
  let y = 300;
  crearSalida(canvas,x, y, "Salida", figuras.length);
  
  figuras.push({ id, tipo: "salida", x, y, width: 120, height: 60, texto });
});

document.getElementById("decision").addEventListener("click", () => {
  let x = 400;
  let y = 400;
  crearDecision(canvas,x, y, "Decision", figuras.length);
  
  figuras.push({ id, tipo: "decision", x, y, width: 120, height: 60, texto });
});
