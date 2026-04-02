console.log("Prairie garden site loaded");

// SVG viewBox-based zoom/pan (vector re-rendering, not raster transform)
const container = document.querySelector("#map-container");
const svg = document.querySelector("#svg1");

if (container && svg) {
  const [baseX, baseY, baseWidth, baseHeight] = svg
    .getAttribute("viewBox")
    .split(" ")
    .map(Number);

  let zoom = 1;
  let viewBox = { x: baseX, y: baseY, width: baseWidth, height: baseHeight };
  let isPanning = false;
  let startPoint = { x: 0, y: 0 };
  let startViewBox = { ...viewBox };

  const minZoom = 1; // don't zoom out below fit-to-box
  const maxZoom = 8;
  const zoomStep = 1.2;

  function clampViewBox() {
    const minX = baseX;
    const minY = baseY;
    const maxX = baseX + baseWidth - viewBox.width;
    const maxY = baseY + baseHeight - viewBox.height;

    if (viewBox.width >= baseWidth) {
      viewBox.x = baseX;
    } else {
      viewBox.x = Math.min(Math.max(viewBox.x, minX), maxX);
    }

    if (viewBox.height >= baseHeight) {
      viewBox.y = baseY;
    } else {
      viewBox.y = Math.min(Math.max(viewBox.y, minY), maxY);
    }
  }

  function applyViewBox() {
    clampViewBox();
    svg.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
  }

  function clientToSvgCoords(clientX, clientY) {
    const rect = svg.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    return {
      x: viewBox.x + (px / rect.width) * viewBox.width,
      y: viewBox.y + (py / rect.height) * viewBox.height,
    };
  }

  container.addEventListener("wheel", (event) => {
    event.preventDefault();

    const pointer = clientToSvgCoords(event.clientX, event.clientY);
    const oldZoom = zoom;
    const factor = event.deltaY > 0 ? 1 / zoomStep : zoomStep;

    zoom = Math.min(maxZoom, Math.max(minZoom, zoom * factor));
    viewBox.width = baseWidth / zoom;
    viewBox.height = baseHeight / zoom;

    // Keep focus on cursor position
    viewBox.x = pointer.x - ((pointer.x - viewBox.x) / (baseWidth / oldZoom)) * viewBox.width;
    viewBox.y = pointer.y - ((pointer.y - viewBox.y) / (baseHeight / oldZoom)) * viewBox.height;

    applyViewBox();
  }, { passive: false });

  container.addEventListener("mousedown", (event) => {
    isPanning = true;
    startPoint = { x: event.clientX, y: event.clientY };
    startViewBox = { ...viewBox };
    container.style.cursor = "grabbing";
  });

  window.addEventListener("mousemove", (event) => {
    if (!isPanning) return;
    const rect = svg.getBoundingClientRect();
    const dx = ((event.clientX - startPoint.x) / rect.width) * viewBox.width;
    const dy = ((event.clientY - startPoint.y) / rect.height) * viewBox.height;
    viewBox.x = startViewBox.x - dx;
    viewBox.y = startViewBox.y - dy;
    applyViewBox();
  });

  window.addEventListener("mouseup", () => {
    if (!isPanning) return;
    isPanning = false;
    container.style.cursor = "grab";
  });

  // Touch pinch & pan
  let touchState = null;

  container.addEventListener("touchstart", (event) => {
    if (event.touches.length === 1) {
      isPanning = true;
      touchState = {
        mode: "pan",
        startX: event.touches[0].clientX,
        startY: event.touches[0].clientY,
        startViewBox: { ...viewBox },
      };
    } else if (event.touches.length === 2) {
      isPanning = false;
      const [a, b] = event.touches;
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      touchState = {
        mode: "pinch",
        startDistance: dist,
        startZoom: zoom,
      };
    }
  }, { passive: false });

  container.addEventListener("touchmove", (event) => {
    if (!touchState) return;
    event.preventDefault();

    const rect = svg.getBoundingClientRect();

    if (touchState.mode === "pan" && event.touches.length === 1) {
      const dx = ((event.touches[0].clientX - touchState.startX) / rect.width) * viewBox.width;
      const dy = ((event.touches[0].clientY - touchState.startY) / rect.height) * viewBox.height;
      viewBox.x = touchState.startViewBox.x - dx;
      viewBox.y = touchState.startViewBox.y - dy;
      applyViewBox();
      return;
    }

    if (touchState.mode === "pinch" && event.touches.length === 2) {
      const [a, b] = event.touches;
      const currentDistance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      let newZoom = Math.min(maxZoom, Math.max(minZoom, touchState.startZoom * (currentDistance / touchState.startDistance)));
      zoom = newZoom;
      viewBox.width = baseWidth / zoom;
      viewBox.height = baseHeight / zoom;
      applyViewBox();
    }
  }, { passive: false });

  container.addEventListener("touchend", () => {
    if (touchState) {
      touchState = null;
      isPanning = false;
    }
  });

  applyViewBox();
}
