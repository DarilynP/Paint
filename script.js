// Get references
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const brushSize = document.getElementById("brush-size");
const colorPicker = document.getElementById("color-picker");
const clearCanvas = document.getElementById("clear-canvas");
const penButton = document.getElementById("pen");
const eraserButton = document.getElementById("eraser");

let isDrawing = false;

// Initialize canvas size
function setCanvasSize() {
  canvas.width = window.innerWidth - 60;
  canvas.height = window.innerHeight * 0.7;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", setCanvasSize);
setCanvasSize();

// Start drawing
function startPosition(e) {
  isDrawing = true;
  draw(e);
}

// End drawing
function endPosition() {
  isDrawing = false;
  ctx.beginPath();
}

// Draw on canvas
function draw(e) {
  if (!isDrawing) return;

  const x = e.offsetX;  // simpler and more reliable
  const y = e.offsetY;

  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = brushSize.value;
  ctx.lineCap = "round";

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Event listeners
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

brushSize.addEventListener("input", () => {
  document.getElementById("brush-size-label").textContent =
    `Brush Size: ${brushSize.value}`;
});

// Pen and eraser tools
function activatePen() {
  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = colorPicker.value;
}

function activateEraser() {
  ctx.globalCompositeOperation = "destination-out";
  ctx.strokeStyle = "rgba(0,0,0,1)";
}

penButton.addEventListener("click", activatePen);
eraserButton.addEventListener("click", activateEraser);
