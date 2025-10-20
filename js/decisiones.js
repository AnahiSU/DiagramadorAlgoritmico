import { iniciarMovimiento, moverFigura, soltarFigura,manejarClicCirculo  } from "./interaccion.js";
function crearDecision(canvas, x, y, texto, id) {
  const ns = "http://www.w3.org/2000/svg";

  const grupo = document.createElementNS(ns, "g");
  grupo.setAttribute("id", id);
  grupo.setAttribute("transform", `translate(${x}, ${y})`);

  const width = texto.length*24;
  const height = 80;

  const points = `
    ${width / 2},0 
    ${width},${height / 2} 
    ${width / 2},${height} 
    0,${height / 2}
  `;

  const rombo = document.createElementNS(ns, "polygon");
  rombo.setAttribute("points", points);
  rombo.setAttribute("fill", "#9de1e3ff");
  rombo.setAttribute("stroke", "#333");
  rombo.setAttribute("class","decision");

  const text = document.createElementNS(ns, "text");
  text.setAttribute("x", width / 2);
  text.setAttribute("y", height / 2 + 5);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "24");
  text.setAttribute("fill", "#000000ff");
  text.textContent = texto;

  const no = document.createElementNS(ns, "text");
  no.setAttribute("x", 0);
  no.setAttribute("y", 25);
  no.setAttribute("text-anchor", "middle");
  no.setAttribute("font-size", "24");
  no.setAttribute("fill", "#000000ff");
  no.textContent = "no";

  const si = document.createElementNS(ns, "text");
  si.setAttribute("x",texto.length*24);
  si.setAttribute("y", 25);
  si.setAttribute("text-anchor", "middle");
  si.setAttribute("font-size", "24");
  si.setAttribute("fill", "#000000ff");
  si.textContent = "si";

  const circle = document.createElementNS(ns, "circle");
  circle.setAttribute("cx", texto.length*24);
  circle.setAttribute("cy", 35);
  circle.setAttribute("r", 6);
  circle.setAttribute("fill", "#9efef9ff");
  circle.setAttribute("stroke", "#000000ff");
  circle.setAttribute("stroke-width", "2");

  const circle2 = document.createElementNS(ns, "circle");
  circle2.setAttribute("cx", 0);
  circle2.setAttribute("cy", 35);
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

  grupo.appendChild(rombo);
  grupo.appendChild(circle);
  grupo.appendChild(circle2);
  grupo.appendChild(text);
  grupo.appendChild(si);
  grupo.appendChild(no);
  canvas.appendChild(grupo);

  grupo.addEventListener("mousedown", iniciarMovimiento);
  grupo.addEventListener("mousemove", moverFigura);
  grupo.addEventListener("mouseup", soltarFigura);
}

export { crearDecision };
