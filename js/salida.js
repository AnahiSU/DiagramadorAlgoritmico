import { iniciarMovimiento, moverFigura, soltarFigura, manejarClicCirculo } from "./interaccion.js";

function crearSalida(canvas,x, y, texto, id) {
  const ns = "http://www.w3.org/2000/svg";

  const grupo = document.createElementNS(ns, "g");
  grupo.setAttribute("id", id);
  grupo.setAttribute("transform", `translate(${x}, ${y})`);

  const ancho = Math.max(texto.length * 20 + 40, 120);
  const alto = 60;

  const ellipse = document.createElementNS(ns, "ellipse");
  ellipse.setAttribute("cx", ancho / 2);
  ellipse.setAttribute("cy", alto / 2);
  ellipse.setAttribute("rx", ancho / 2);
  ellipse.setAttribute("ry", alto / 2);
  ellipse.setAttribute("fill", "#FFA07A");
  ellipse.setAttribute("stroke", "#333");
  ellipse.setAttribute("stroke-width", "2");
  ellipse.setAttribute("class","salida");  


  const text = document.createElementNS(ns, "text");
  text.setAttribute("x", ancho / 2);  
  text.setAttribute("y", alto / 2 + 5); 
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "24");
  text.setAttribute("fill", "#000");
  text.textContent = texto;

  const circle = document.createElementNS(ns, "circle");
  circle.setAttribute("cx", ancho / 2);
  circle.setAttribute("cy", 0);
  circle.setAttribute("r", 6);
  circle.setAttribute("fill", "#ff4444");
  circle.setAttribute("stroke", "#000000ff");
  circle.setAttribute("stroke-width", "2");
  circle.style.cursor = "pointer";

  circle.addEventListener("click", (e) => {
    manejarClicCirculo(e, grupo, circle);
  });

  grupo.appendChild(ellipse);
  grupo.appendChild(text);
  grupo.appendChild(circle);
  canvas.appendChild(grupo);

  grupo.addEventListener("mousedown", iniciarMovimiento);
  grupo.addEventListener("mousemove", moverFigura);
  grupo.addEventListener("mouseup", soltarFigura);

  return grupo;
}

export { crearSalida };