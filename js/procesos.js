import { iniciarMovimiento, moverFigura, soltarFigura } from "./interaccion.js";

function crearProceso(canvas,x, y, texto, id) {
  const ns = "http://www.w3.org/2000/svg";

  const grupo = document.createElementNS(ns, "g");
  grupo.setAttribute("id", id);
  grupo.setAttribute("transform", `translate(${x}, ${y})`);

  const rect = document.createElementNS(ns, "rect");
  rect.setAttribute("width", texto.length*20);
  rect.setAttribute("height", 60);
  rect.setAttribute("rx", 10);
  rect.setAttribute("ry", 10);
  rect.setAttribute("fill", "#6EA8FE");
  rect.setAttribute("stroke", "#333");
  rect.setAttribute("class","procedimiento");

  const text = document.createElementNS(ns, "text");
  text.setAttribute("x", texto.length*10);  
  text.setAttribute("y", 35); 
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "24");
  text.setAttribute("fill", "#fff");
  text.textContent = texto;

  grupo.appendChild(rect);
  grupo.appendChild(text);
  canvas.appendChild(grupo);

  grupo.addEventListener("mousedown", iniciarMovimiento);
  grupo.addEventListener("mousemove", moverFigura);
  grupo.addEventListener("mouseup", soltarFigura);
}

export { crearProceso };