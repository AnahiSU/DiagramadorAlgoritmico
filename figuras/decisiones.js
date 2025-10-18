function crearDecision(canvas, x, y, texto, numFig) {
  const ns = "http://www.w3.org/2000/svg";

  const grupo = document.createElementNS(ns, "g");
  const id = "decision" + (numFig + 1);
  grupo.setAttribute("id", id);
  grupo.setAttribute("transform", `translate(${x}, ${y})`);

  const width = 120;
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

  const text = document.createElementNS(ns, "text");
  text.setAttribute("x", width / 2);
  text.setAttribute("y", height / 2 + 5);
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "14");
  text.setAttribute("fill", "#000000ff");
  text.textContent = texto;

  grupo.appendChild(rombo);
  grupo.appendChild(text);
  canvas.appendChild(grupo);

  //grupo.addEventListener("mousedown", seleccionarFigura);
}

export { crearDecision };
