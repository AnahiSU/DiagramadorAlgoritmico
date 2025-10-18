function crearProceso(canvas,x, y, texto, numFig) {
  const ns = "http://www.w3.org/2000/svg";

  const grupo = document.createElementNS(ns, "g");
  const id = "proceso" + (numFig + 1);
  grupo.setAttribute("id", id);
  grupo.setAttribute("transform", `translate(${x}, ${y})`);

  // 🔹 Rectángulo (cuerpo del proceso)
  const rect = document.createElementNS(ns, "rect");
  rect.setAttribute("width", 120);
  rect.setAttribute("height", 60);
  rect.setAttribute("rx", 10);
  rect.setAttribute("ry", 10);
  rect.setAttribute("fill", "#6EA8FE");
  rect.setAttribute("stroke", "#333");

  // 🔹 Texto (etiqueta del proceso)
  const text = document.createElementNS(ns, "text");
  text.setAttribute("x", 60);  // mitad del rectángulo
  text.setAttribute("y", 35);  // algo centrado verticalmente
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "14");
  text.setAttribute("fill", "#fff");
  text.textContent = texto;

  // 🔹 Agregar al grupo
  grupo.appendChild(rect);
  grupo.appendChild(text);
  canvas.appendChild(grupo);

  //grupo.addEventListener("mousedown", seleccionarFigura);
}

export { crearProceso };