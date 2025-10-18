import { crearProceso } from "./procesos.js";
import { crearEntrada } from "./entrada.js";
import { crearSalida } from "./salida.js";
import { crearDecision } from "./decisiones.js";

const canvas = document.getElementById("svg-canva");
const figuras = [];
let figuraSeleccionada = null;
let offsetX = 0, offsetY = 0;

let tipoFiguraSeleccionada = null;
let coordenadas = { x: 100, y: 100 };

let id;

const modal = document.getElementById("modal-texto");
const inputTexto = document.getElementById("input-texto");
const btnAceptar = document.getElementById("btn-aceptar");
const btnCancelar = document.getElementById("btn-cancelar");

function mostrarModal() {
  modal.style.display = "flex";
  inputTexto.value = "";
  inputTexto.focus();
}

document.getElementById("procedimiento").addEventListener("click", () => {
  tipoFiguraSeleccionada = "entrada";
  id = "proceso" + (figuras.length + 1);
  mostrarModal();
});

document.getElementById("entrada").addEventListener("click", () => {
  tipoFiguraSeleccionada = "entrada";
  id = "entrada" + (figuras.length + 1);
  mostrarModal();
});

document.getElementById("salida").addEventListener("click", () => {
  tipoFiguraSeleccionada = "salida";
  id = "salida" + (figuras.length + 1);
  mostrarModal();
});

document.getElementById("decision").addEventListener("click", () => {
  tipoFiguraSeleccionada = "decision";
  id = "decision" + (figuras.length + 1);
  mostrarModal();
});

btnAceptar.addEventListener("click",() =>{
  const texto = inputTexto.value.trim();

  if(!texto) return;
    
  if(tipoFiguraSeleccionada === "proceso"){
    crearProceso(canvas,100,100,texto,id);
  }else if(tipoFiguraSeleccionada === "entrada"){
    crearEntrada(canvas,100,100,texto,id);
  }else if(tipoFiguraSeleccionada === "decision"){
    crearDecision(canvas,100,100,texto,id);
  }else if(tipoFiguraSeleccionada === "salida"){
    crearSalida(canvas,100,100,texto,id);
  }
  figuras.push({ tipo: tipoFiguraSeleccionada, texto, x: coordenadas.x, y: coordenadas.y });
  modal.style.display = "none";
  console.log(figuras);
});

btnCancelar.addEventListener("click", () => {
  modal.style.display = "none";
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