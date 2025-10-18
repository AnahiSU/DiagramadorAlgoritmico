function crearSalida(canvas,x, y, texto, numFig) {
  const ns = "http://www.w3.org/2000/svg";

  const grupo = document.createElementNS(ns, "g");
  const id = "entrada" + (numFig + 1);
  grupo.setAttribute("id", id);
  grupo.setAttribute("transform", `translate(${x}, ${y})`);

  const rect = document.createElementNS(ns, "rect");
  rect.setAttribute("width", 120);
  rect.setAttribute("height", 60);
  rect.setAttribute("rx", 10);
  rect.setAttribute("ry", 10);
  rect.setAttribute("fill", "#faba61ff");
  rect.setAttribute("stroke", "#333");

  const text = document.createElementNS(ns, "text");
  text.setAttribute("x", 60);  
  text.setAttribute("y", 35); 
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "14");
  text.setAttribute("fill", "#000000ff");
  text.textContent = texto;
  
  grupo.appendChild(rect);
  grupo.appendChild(text);
  canvas.appendChild(grupo);

  //grupo.addEventListener("mousedown", seleccionarFigura);
}

export { crearSalida };