// conexiones.js
const ns = "http://www.w3.org/2000/svg";

// Configuración de puntos por tipo de figura
const configPuntos = {
  "proceso": [
    { posicion: "bottom", x: 0, y: 30, id: "bottom" }
  ],
  "entrada": [
    { posicion: "bottom", x: 0, y: 30, id: "bottom" }
  ],
  "salida": [
    { posicion: "bottom", x: 0, y: 30, id: "bottom" }
  ],
  "decision": [
    { posicion: "right", x: 60, y: 0, id: "right" },
    { posicion: "bottom", x: 0, y: 60, id: "bottom" }
  ]
};

function crearPuntosConexion(grupo, tipoFigura, ancho, alto) {
  const puntosGrupo = document.createElementNS(ns, "g");
  puntosGrupo.setAttribute("class", "puntos-conexion");
  puntosGrupo.style.display = "none";

  const puntosConfig = configPuntos[tipoFigura] || [];
  
  puntosConfig.forEach((punto, index) => {
    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", punto.x);
    circle.setAttribute("cy", punto.y);
    circle.setAttribute("r", 6);
    circle.setAttribute("fill", "#ff4444");
    circle.setAttribute("stroke", "#fff");
    circle.setAttribute("stroke-width", "2");
    circle.setAttribute("class", `punto-conexion punto-${punto.posicion}`);
    circle.setAttribute("data-posicion", punto.posicion);
    circle.setAttribute("data-id", `${tipoFigura}-${punto.id}`);

    circle.style.cursor = "crosshair";
    
    puntosGrupo.appendChild(circle);
  });

  grupo.appendChild(puntosGrupo);
  return puntosGrupo;
}

function mostrarPuntosConexion(figura) {
  const puntos = figura.querySelector(".puntos-conexion");
  if (puntos) {
    puntos.style.display = "block";
  }
}

function ocultarPuntosConexion(figura) {
  const puntos = figura.querySelector(".puntos-conexion");
  if (puntos) {
    puntos.style.display = "none";
  }
}

function obtenerPuntoConexion(figura, posicion) {
  const punto = figura.querySelector(`.punto-conexion[data-posicion="${posicion}"]`);
  if (punto) {
    const transform = figura.getAttribute("transform");
    const match = transform.match(/translate\(([-\d.]+),\s*([-\d.]+)\)/);
    const xFig = match ? parseFloat(match[1]) : 0;
    const yFig = match ? parseFloat(match[2]) : 0;
    
    const cx = parseFloat(punto.getAttribute("cx")) + xFig;
    const cy = parseFloat(punto.getAttribute("cy")) + yFig;
    
    return { x: cx, y: cy, elemento: punto };
  }
  return null;
}

export { 
  crearPuntosConexion, 
  mostrarPuntosConexion, 
  ocultarPuntosConexion, 
  obtenerPuntoConexion,
  configPuntos 
};