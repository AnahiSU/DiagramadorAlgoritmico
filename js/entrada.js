import { iniciarMovimiento, moverFigura, soltarFigura, manejarClicCirculo } from "./interaccion.js";

function crearEntrada(canvas,x, y, texto, id) {
  const ns = "http://www.w3.org/2000/svg";

  const grupo = document.createElementNS(ns, "g");
  grupo.setAttribute("id", id);
  grupo.setAttribute("transform", `translate(${x}, ${y})`);

  const ancho = Math.max(texto.length * 20 + 40, 120);
  const alto = 60;

  const polygon = document.createElementNS(ns, "polygon");
  const puntos = `
    ${ancho * 0.2},0 
    ${ancho},0 
    ${ancho * 0.8},${alto} 
    0,${alto}
  `;
  polygon.setAttribute("points", puntos);
  polygon.setAttribute("fill", "#90EE90");
  polygon.setAttribute("stroke", "#333");
  polygon.setAttribute("stroke-width", "2");
  polygon.setAttribute("class","entrada");

  const text = document.createElementNS(ns, "text");
  text.setAttribute("x", ancho / 2);  
  text.setAttribute("y", alto / 2 + 5); 
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "24");
  text.setAttribute("fill", "#000");
  text.textContent = texto;

  const circle2 = document.createElementNS(ns, "circle");
  circle2.setAttribute("cx", ancho / 2);
  circle2.setAttribute("cy", alto);
  circle2.setAttribute("r", 6);
  circle2.setAttribute("fill", "#ff4444");
  circle2.setAttribute("stroke", "#000000ff");
  circle2.setAttribute("stroke-width", "2");
  circle2.style.cursor = "pointer";
  
  circle2.addEventListener("click", (e) => {
    manejarClicCirculo(e, grupo, circle2);
  });

  grupo.appendChild(polygon);
  grupo.appendChild(text);
  grupo.appendChild(circle2);
  canvas.appendChild(grupo);

  grupo.addEventListener("mousedown", iniciarMovimiento);
  grupo.addEventListener("mousemove", moverFigura);
  grupo.addEventListener("mouseup", soltarFigura);

  return grupo;
}

export { crearEntrada };