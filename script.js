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

// ===== Plant Click Handler =====
// Initialize plant interaction system
document.addEventListener('DOMContentLoaded', function() {
  initPlantClickHandlers();
});

/**
 * Initialize plant click handlers
 * Maps text elements containing plant codes to their ellipses and adds click handlers
 */
function initPlantClickHandlers() {
  const svg = document.querySelector('#svg1');
  if (!svg) return;

  // Find all text elements that contain plant codes
  const textElements = svg.querySelectorAll('text tspan[sodipodi\\:role="line"]');
  const plantCodeMap = new Map(); // Map of plant code -> array of ellipses

  textElements.forEach(tspan => {
    const text = tspan.textContent.trim();
    
    // Check if this is a valid plant code (not "Sidewalk" or other labels)
    if (text && text.length <= 3 && getAllPlantCodes().includes(text)) {
      const textElement = tspan.closest('text');
      if (!textElement) return;

      // Get the text element's position
      const x = parseFloat(textElement.getAttribute('x')) || 0;
      const y = parseFloat(textElement.getAttribute('y')) || 0;

      // Find nearby ellipses (within reasonable distance)
      const ellipses = svg.querySelectorAll('ellipse');
      ellipses.forEach(ellipse => {
        const cx = parseFloat(ellipse.getAttribute('cx')) || 0;
        const cy = parseFloat(ellipse.getAttribute('cy')) || 0;
        const rx = parseFloat(ellipse.getAttribute('rx')) || 0;
        const ry = parseFloat(ellipse.getAttribute('ry')) || 0;

        // Check if text is approximately at the center of this ellipse
        const dx = Math.abs(x - cx);
        const dy = Math.abs(y - cy);
        const threshold = Math.max(rx, ry) * 2;

        if (dx < threshold && dy < threshold) {
          // Store the mapping and add event listener
          if (!plantCodeMap.has(text)) {
            plantCodeMap.set(text, []);
          }
          plantCodeMap.get(text).push(ellipse);

          // Add click handler to ellipse
          ellipse.style.cursor = 'pointer';
          ellipse.addEventListener('click', function(event) {
            event.stopPropagation();
            showPlantInfo(text);
          });
        }
      });
    }
  });

  console.log(`Initialized click handlers for ${plantCodeMap.size} plant species`);
}

/**
 * Display plant information in modal
 * @param {string} plantCode - Plant code (e.g., 'PC', 'GR')
 */
function showPlantInfo(plantCode) {
  const plant = getPlantByCode(plantCode);
  if (!plant) {
    console.warn(`Plant not found: ${plantCode}`);
    return;
  }

  // Update modal content
  document.getElementById('plant-name').textContent = plant.commonName;
  document.getElementById('plant-code').textContent = plant.code;
  document.getElementById('plant-scientific').textContent = plant.scientificName;
  document.getElementById('plant-description').textContent = plant.description;
  document.getElementById('plant-height').textContent = plant.height;
  document.getElementById('plant-spacing').textContent = plant.spacing;
  document.getElementById('plant-count').textContent = plant.count;

  // Show modal
  const modal = document.getElementById('plant-modal');
  modal.classList.remove('hidden');
}

/**
 * Hide plant information modal
 */
function hidePlantInfo() {
  const modal = document.getElementById('plant-modal');
  modal.classList.add('hidden');
}

// Modal close button handler
document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.querySelector('.plant-modal-close');
  const modal = document.getElementById('plant-modal');

  if (closeBtn) {
    closeBtn.addEventListener('click', hidePlantInfo);
  }

  // Close modal when clicking outside of it
  if (modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        hidePlantInfo();
      }
    });
  }

  // Close modal on ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      hidePlantInfo();
    }
  });
});
