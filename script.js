import { crearProceso } from "./figuras/procesos.js";
const canvas = document.getElementById("svg-canva");
const figuras = [];
let figuraSeleccionada = null;
let offsetX = 0, offsetY = 0;


document.getElementById("procedimiento").addEventListener("click", () => {
  let x = 100;
  let y = 100;
  crearProceso(canvas,x, y, "Proceso", figuras.length);
  // 🔹 Guardar en el array de figuras
  figuras.push({ id, tipo: "proceso", x, y, width: 120, height: 60, texto });
});


