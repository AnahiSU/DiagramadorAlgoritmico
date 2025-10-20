import { crearProceso } from "./procesos.js";
import { crearEntrada } from "./entrada.js";
import { crearSalida } from "./salida.js";
import { crearDecision } from "./decisiones.js";

const canvas = document.getElementById("svg-canva");
const figuras = [];
const conexiones = [];

let figuraSeleccionada = null;
let offsetX = 0, offsetY = 0;

let tipoFiguraSeleccionada = null;
let coordenadas = { x: 100, y: 100 };

let id;

const modal = document.getElementById("modal-texto");
const inputTexto = document.getElementById("input-texto");
const btnAceptar = document.getElementById("btn-aceptar");
const btnCancelar = document.getElementById("btn-cancelar");

let primerPunto = null;
let primerFigura = null;

function mostrarModal() {
  modal.style.display = "flex";
  inputTexto.value = "";
  inputTexto.focus();
}

document.getElementById("procedimiento").addEventListener("click", () => {
  tipoFiguraSeleccionada = "proceso";
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
    
  let nuevaFigura;
  if(tipoFiguraSeleccionada === "proceso"){
    nuevaFigura = crearProceso(canvas,100,100,texto,id);
  }else if(tipoFiguraSeleccionada === "entrada"){
    nuevaFigura = crearEntrada(canvas,100,100,texto,id);
  }else if(tipoFiguraSeleccionada === "decision"){
    nuevaFigura = crearDecision(canvas,100,100,texto,id);
  }else if(tipoFiguraSeleccionada === "salida"){
    nuevaFigura = crearSalida(canvas,100,100,texto,id);
  }
  
  figuras.push({ 
    tipo: tipoFiguraSeleccionada, 
    texto, 
    x: coordenadas.x, 
    y: coordenadas.y,
    elemento: nuevaFigura,
    id: id
  });
  
  modal.style.display = "none";
});

btnCancelar.addEventListener("click", () => {
  modal.style.display = "none";
});

function manejarClicCirculo(e, figura, circulo) {
  e.stopPropagation();
  
  if (!primerPunto) {
    primerPunto = circulo;
    primerFigura = figura;
    circulo.setAttribute("fill", "#fb0000ff"); 
    console.log("Primer punto seleccionado. Haz clic en el segundo punto.");
  } else {
    if (figura === primerFigura && circulo === primerPunto) {
      console.log("No puedes conectar el mismo punto");
      return;
    }
    
    crearConexion(primerFigura, primerPunto, figura, circulo);
    
    primerPunto.setAttribute("fill", "#9efef9ff");
    primerPunto = null;
    primerFigura = null;
  }
}

function crearConexion(figura1, punto1, figura2, punto2) {
  const ns = "http://www.w3.org/2000/svg";

  const pos1 = obtenerPosicionAbsoluta(figura1, punto1);
  const pos2 = obtenerPosicionAbsoluta(figura2, punto2);

  const linea = document.createElementNS(ns, "line");
  linea.setAttribute("x1", pos1.x);
  linea.setAttribute("y1", pos1.y);
  linea.setAttribute("x2", pos2.x);
  linea.setAttribute("y2", pos2.y);
  linea.setAttribute("stroke", "#333");
  linea.setAttribute("stroke-width", "3");
  linea.setAttribute("class", "conexion");

  const flecha = crearFlecha(pos1, pos2);

  canvas.appendChild(linea);
  canvas.appendChild(flecha);

  conexiones.push({
    figura1: figura1,
    punto1: punto1,
    figura2: figura2,
    punto2: punto2,
    linea: linea,
    flecha: flecha
  });
  
  console.log("Conexión creada exitosamente");
}

function obtenerPosicionAbsoluta(figura, punto) {
  const transform = figura.getAttribute("transform");
  const match = transform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/);
  const xFig = match ? parseFloat(match[1]) : 0;
  const yFig = match ? parseFloat(match[2]) : 0;
  
  const cx = parseFloat(punto.getAttribute("cx")) + xFig;
  const cy = parseFloat(punto.getAttribute("cy")) + yFig;
  
  return { x: cx, y: cy };
}

function crearFlecha(origen, destino) {
  const ns = "http://www.w3.org/2000/svg";

  const angle = Math.atan2(destino.y - origen.y, destino.x - origen.x);
  const arrowLength = 12;

  const x1 = destino.x - arrowLength * Math.cos(angle - Math.PI / 6);
  const y1 = destino.y - arrowLength * Math.sin(angle - Math.PI / 6);
  const x2 = destino.x - arrowLength * Math.cos(angle + Math.PI / 6);
  const y2 = destino.y - arrowLength * Math.sin(angle + Math.PI / 6);
  
  const flecha = document.createElementNS(ns, "polygon");
  flecha.setAttribute("points", 
    `${destino.x},${destino.y} ${x1},${y1} ${x2},${y2}`
  );
  flecha.setAttribute("fill", "#333");
  flecha.setAttribute("class", "flecha-conexion");
  
  return flecha;
}

function actualizarConexiones() {
  conexiones.forEach(conexion => {
    const pos1 = obtenerPosicionAbsoluta(conexion.figura1, conexion.punto1);
    const pos2 = obtenerPosicionAbsoluta(conexion.figura2, conexion.punto2);
    
    conexion.linea.setAttribute("x1", pos1.x);
    conexion.linea.setAttribute("y1", pos1.y);
    conexion.linea.setAttribute("x2", pos2.x);
    conexion.linea.setAttribute("y2", pos2.y);

    canvas.removeChild(conexion.flecha);
    const nuevaFlecha = crearFlecha(pos1, pos2);
    canvas.appendChild(nuevaFlecha);
    conexion.flecha = nuevaFlecha;
  });
}

function iniciarMovimiento(e) {
  const target = e.target.closest("g"); 
  if (!target) return;

  figuraSeleccionada = target;
  
  const transform = figuraSeleccionada.getAttribute("transform");
  let currentX = 0, currentY = 0;
  
  if (transform) {
    const match = transform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/);
    if (match) {
      currentX = parseFloat(match[1]);
      currentY = parseFloat(match[2]);
    }
  }
  
  const rect = canvas.getBoundingClientRect();
  offsetX = e.clientX - rect.left - currentX;
  offsetY = e.clientY - rect.top - currentY;
  
  document.addEventListener("mousemove", moverFigura);
  document.addEventListener("mouseup", soltarFigura);
}

function moverFigura(e) {
  if (!figuraSeleccionada) return;
  
  const rect = canvas.getBoundingClientRect();
  const newX = e.clientX - rect.left - offsetX;
  const newY = e.clientY - rect.top - offsetY;
  
  figuraSeleccionada.setAttribute("transform", `translate(${newX}, ${newY})`);

  const figuraIndex = figuras.findIndex(f => f.elemento === figuraSeleccionada);
  if (figuraIndex !== -1) {
    figuras[figuraIndex].x = newX;
    figuras[figuraIndex].y = newY;
  }
  
  actualizarConexiones();
}

function soltarFigura() {
  if (!figuraSeleccionada) return;
  
  document.removeEventListener("mousemove", moverFigura);
  document.removeEventListener("mouseup", soltarFigura);
  
  figuraSeleccionada = null;
}

export { 
  iniciarMovimiento, 
  moverFigura, 
  soltarFigura, 
  manejarClicCirculo,
};