import { crearProceso } from "./procesos.js";
import { crearEntrada } from "./entrada.js";
import { crearSalida } from "./salida.js";
import { crearDecision } from "./decisiones.js";
import PouchDBManager from './PouchDBManager.js';

const dbManager = new PouchDBManager();

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

document.getElementById("eliminar").addEventListener("click",()=>{
  limpiarTodo();
})

document.getElementById("guardar").addEventListener("click",()=>{
  autoguardar();
})

btnAceptar.addEventListener("click", () => {
  const texto = inputTexto.value.trim();

  if (!texto) return;

  let nuevaFigura;
  if (tipoFiguraSeleccionada === "proceso") {
    nuevaFigura = crearProceso(canvas, 100, 100, texto, id);
  } else if (tipoFiguraSeleccionada === "entrada") {
    nuevaFigura = crearEntrada(canvas, 100, 100, texto, id);
  } else if (tipoFiguraSeleccionada === "decision") {
    nuevaFigura = crearDecision(canvas, 100, 100, texto, id);
  } else if (tipoFiguraSeleccionada === "salida") {
    nuevaFigura = crearSalida(canvas, 100, 100, texto, id);
  }

  document.dispatchEvent(new CustomEvent('figuraCreada'));
  
  modal.style.display = "none";
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
  } else {
    if (figura === primerFigura && circulo === primerPunto) {
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

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('exportar').addEventListener('click', exportarAJSON);

  const inputImportar = document.createElement('input');
  inputImportar.type = 'file';
  inputImportar.accept = '.json';
  inputImportar.style.display = 'none';
  inputImportar.addEventListener('change', importarDesdeJSON);
  document.body.appendChild(inputImportar);

  document.getElementById('importar').addEventListener('click', function () {
    inputImportar.click();
  });
});

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


function exportarAJSON() {
  const datos = {
    figuras: figuras.map(figura => ({
      tipo: figura.tipo,
      texto: figura.texto,
      x: figura.x,
      y: figura.y,
      id: figura.id
    })),
    conexiones: conexiones.map(conexion => ({
      idFigura1: conexion.figura1.getAttribute('id'),
      idFigura2: conexion.figura2.getAttribute('id'),
      posicion1: conexion.punto1.getAttribute('data-posicion'),
      posicion2: conexion.punto2.getAttribute('data-posicion')
    })),
    fechaExportacion: new Date().toISOString(),
    version: "1.0"
  };
  const jsonString = JSON.stringify(datos, null, 2);

  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `diagrama_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importarDesdeJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  
  reader.onload = function(e) {
    try {
      const datos = JSON.parse(e.target.result);

      if (!datos.figuras || !Array.isArray(datos.figuras)) {
        throw new Error('El archivo no tiene la estructura correcta');
      }
      const confirmar = confirm(
        `¿Importar diagrama?\n\n` +
        `Figuras: ${datos.figuras.length}\n` +
        `Conexiones: ${datos.conexiones?.length || 0}\n\n` +
        `Esto reemplazará el diagrama actual.`
      );
      
      if (confirmar) {
        cargarDiagramaDesdeJSON(datos);
      }
      
    } catch (error) {
      alert(`Error al importar: ${error.message}\n\nAsegúrate de que el archivo es un JSON válido exportado desde esta aplicación.`);
    }
  };
  
  reader.onerror = function() {
    alert('Error al leer el archivo');
  };
  
  reader.readAsText(file);

  event.target.value = '';
}

function prepararDatosAutoguardado() {
  return {
    figuras: figuras.map(figura => ({
      tipo: figura.tipo,
      texto: figura.texto,
      x: figura.x,
      y: figura.y,
      id: figura.id
    })),
    conexiones: conexiones.map(conexion => ({
      idFigura1: conexion.figura1.getAttribute('id'),
      idFigura2: conexion.figura2.getAttribute('id'),
      posicion1: conexion.punto1.getAttribute('data-posicion'),
      posicion2: conexion.punto2.getAttribute('data-posicion')
    })),
    ultimoGuardado: new Date().toISOString()
  };
}

async function autoguardar() {
  if (figuras.length > 0 || conexiones.length > 0) {
    try {
      const datos = prepararDatosAutoguardado();
      await dbManager.saveDiagram(datos);
    } catch (error) {
      console.log('Error en autoguardado:', error);
    }
  }
}

function cargarDiagramaDesdeJSON(datos) {
  limpiarCanvasCompleto();

  datos.figuras.forEach((figuraData) => {
    let elementoFigura;

    switch(figuraData.tipo) {
      case 'proceso':
        crearProceso(canvas, figuraData.x, figuraData.y, figuraData.texto, figuraData.id);
        break;
      case 'entrada':
        crearEntrada(canvas, figuraData.x, figuraData.y, figuraData.texto, figuraData.id);
        break;
      case 'salida':
        crearSalida(canvas, figuraData.x, figuraData.y, figuraData.texto, figuraData.id);
        break;
      case 'decision':
        crearDecision(canvas, figuraData.x, figuraData.y, figuraData.texto, figuraData.id);
        break;
    }

    elementoFigura = document.getElementById(figuraData.id);

    if (elementoFigura) {
      const figuraObj = {
        tipo: figuraData.tipo,
        texto: figuraData.texto,
        x: figuraData.x,
        y: figuraData.y,
        elemento: elementoFigura,
        id: figuraData.id
      };
      figuras.push(figuraObj);
    }
  });

  setTimeout(() => {
    if (datos.conexiones && datos.conexiones.length > 0) {
      let conexionesCreadas = 0;
      
      datos.conexiones.forEach((conexionData) => {
        const figura1 = encontrarFiguraPorId(conexionData.idFigura1);
        const figura2 = encontrarFiguraPorId(conexionData.idFigura2);

        if (figura1 && figura2 && figura1.elemento && figura2.elemento) {
          const punto1 = encontrarPuntoPorPosicion(figura1.elemento, conexionData.posicion1);
          const punto2 = encontrarPuntoPorPosicion(figura2.elemento, conexionData.posicion2);

          if (punto1 && punto2) {
            crearConexion(figura1.elemento, punto1, figura2.elemento, punto2);
            conexionesCreadas++;
          }
        }
      });
      
      console.log(`Conexiones restauradas: ${conexionesCreadas} de ${datos.conexiones.length}`);
    }
  }, 100);
}

function limpiarCanvasCompleto() {
  document.querySelectorAll('.conexion, .flecha-conexion').forEach(elemento => {
    elemento.remove();
  });
  figuras.forEach(figura => {
    if (figura.elemento && figura.elemento.parentNode) {
      figura.elemento.parentNode.removeChild(figura.elemento);
    }
  });
  figuras.length = 0;
  conexiones.length = 0;
}

function encontrarFiguraPorId(id) {
  return figuras.find(figura => figura.id === id);
}

function encontrarPuntoPorPosicion(figura, posicion) {
  if (!figura) return null;
  return figura.querySelector(`[data-posicion="${posicion}"]`);
}

async function cargarAutoguardado() {
  try {
    const datos = await dbManager.loadDiagram();
    if (datos) {
      cargarDiagramaDesdeJSON(datos);
      return true;
    }
  } catch (error) {
    console.log('Error cargando autoguardado:', error);
  }
  return false;

}

async function limpiarTodo(){
  limpiarAutoguardado();
  limpiarCanvasCompleto();
}

async function limpiarAutoguardado() {
  try {
    const doc = await dbManager.db.get('current-diagram');
    await dbManager.db.remove(doc);
    console.log('Autoguardado limpiado');
  } catch (error) {
    console.log('No había autoguardado que limpiar');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(async () => {
    await cargarAutoguardado();
  }, 500);
  setInterval(() => {
    autoguardar();
  }, 10000);

  window.addEventListener('beforeunload', autoguardar);
  document.addEventListener('figuraCreada', autoguardar);
});

export {
  figuras,
  conexiones,
  iniciarMovimiento,
  moverFigura,
  soltarFigura,
  manejarClicCirculo,
  exportarAJSON,
  importarDesdeJSON,
  autoguardar,
  cargarAutoguardado
};