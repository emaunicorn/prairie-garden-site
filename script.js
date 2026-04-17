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
 * Convert rgb or rgba to hex
 * @param {string} color - Color string
 * @returns {string} Hex color
 */
function rgbToHex(color) {
  if (color.startsWith('#')) {
    // If hex with alpha (9 chars) and alpha is ff, strip it
    if (color.length === 9 && color.slice(-2) === 'ff') {
      return color.slice(0, 7);
    }
    return color;
  }
  if (color.startsWith('rgb')) {
    const rgb = color.match(/\d+/g);
    if (rgb.length >= 3) {
      return '#' + ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
    }
  }
  return color;
}

/**
 * Initialize plant click handlers
 * Adds click handlers to ellipses and circles based on their fill color
 */
function initPlantClickHandlers() {
  const svg = document.querySelector('#svg1');
  if (!svg) return;

  // Find all ellipses and circles
  const shapes = svg.querySelectorAll('ellipse, circle');

  shapes.forEach(shape => {
    // Get the fill color from style or attribute
    let fill = shape.style.fill || shape.getAttribute('fill');
    if (!fill || fill === 'none') return;

    // Convert rgb to hex if necessary
    fill = rgbToHex(fill);

    // Normalize to lowercase
    fill = fill.toLowerCase();

    // Find the plant by color
    const plant = getPlantByColor(fill);
    console.log('Shape fill:', fill, 'plant:', plant ? plant.code : 'none');
    if (plant) {
      shape.style.cursor = 'pointer';
      shape.addEventListener('click', function(event) {
        event.stopPropagation();
        console.log('Clicked plant:', plant.code, 'color:', fill);
        showPlantInfo(plant.code);
      });
    } else {
      console.log('No plant found for color:', fill);
    }
  });

  console.log(`Initialized click handlers for plant shapes`);
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

/**
 * Get plant data by code
 * @param {string} code - Plant code
 * @returns {object|null} Plant data or null
 */
function getPlantByCode(code) {
  return plantsDatabase[code] || null;
}

/**
 * Get plant data by color
 * @param {string} color - Fill color
 * @returns {object|null} Plant data or null
 */
function getPlantByColor(color) {
  for (const code in plantsDatabase) {
    if (plantsDatabase[code].color) {
      const dbColor = rgbToHex(plantsDatabase[code].color.toLowerCase());
      if (dbColor === color) {
        return plantsDatabase[code];
      }
    }
  }
  return null;
}

/**
 * Get all plant codes
 * @returns {array} Array of plant codes
 */
function getAllPlantCodes() {
  return Object.keys(plantsDatabase);
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
