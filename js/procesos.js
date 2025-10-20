import { iniciarMovimiento, moverFigura, soltarFigura, manejarClicCirculo } from "./interaccion.js";

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
  rect.setAttribute("fill", "#e6acf2ff");
  rect.setAttribute("stroke", "#333");
  rect.setAttribute("class","procedimiento");

  const text = document.createElementNS(ns, "text");
  text.setAttribute("x", texto.length*10);  
  text.setAttribute("y", 35); 
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "24");
  text.setAttribute("fill", "#000000ff");
  text.textContent = texto;

  const circle = document.createElementNS(ns, "circle");
  circle.setAttribute("cx", texto.length*10);
  circle.setAttribute("cy", 0);
  circle.setAttribute("r", 6);
  circle.setAttribute("fill", "#9efef9ff");
  circle.setAttribute("stroke", "#000000ff");
  circle.setAttribute("stroke-width", "2");

  const circle2 = document.createElementNS(ns, "circle");
  circle2.setAttribute("cx", texto.length*10);
  circle2.setAttribute("cy", 60);
  circle2.setAttribute("r", 6);
  circle2.setAttribute("fill", "#9efef9ff");
  circle2.setAttribute("stroke", "#000000ff");
  circle2.setAttribute("stroke-width", "2");
  
  circle2.addEventListener("click", (e) => {
    manejarClicCirculo(e, grupo, circle2);
  });
  circle.addEventListener("click", (e) => {
    manejarClicCirculo(e, grupo, circle);
  });


  grupo.appendChild(rect);
  grupo.appendChild(text);
  grupo.appendChild(circle);
  grupo.appendChild(circle2);
  canvas.appendChild(grupo);

  grupo.addEventListener("mousedown", iniciarMovimiento);
  grupo.addEventListener("mousemove", moverFigura);
  grupo.addEventListener("mouseup", soltarFigura);
}

export { crearProceso };