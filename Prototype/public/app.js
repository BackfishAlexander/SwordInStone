const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

ctx.lineWidth = 5; // Setting line thickness

// Initialize socket connection
const socket = io("http://localhost:3000");

// Common drawing function
function draw(event) {
  const rect = canvas.getBoundingClientRect();
  let x, y;

  if (event.touches) {
    // Check if the event has touch data
    x = event.touches[0].clientX - rect.left;
    y = event.touches[0].clientY - rect.top;
  } else {
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  }

  if (isDrawing) {
    drawOnCanvas(x, y, "draw");
    sendDrawingData(x, y, "draw");
  }
}

canvas.addEventListener("mousedown", function (event) {
  isDrawing = true;
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;
  drawOnCanvas(x, y, "start");
  sendDrawingData(x, y, "start");
});

canvas.addEventListener("mouseup", function () {
  isDrawing = false;
  ctx.beginPath();
  sendDrawingData(null, null, "end");
});

canvas.addEventListener("mousemove", draw);

// Touch events for mobile
canvas.addEventListener("touchstart", function (event) {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  const x = event.touches[0].clientX - rect.left;
  const y = event.touches[0].clientY - rect.top;
  drawOnCanvas(x, y, "start");
  sendDrawingData(x, y, "start");
  event.preventDefault(); // Prevent default to avoid scrolling while drawing
});

canvas.addEventListener("touchend", function () {
  isDrawing = false;
  ctx.beginPath();
  sendDrawingData(null, null, "end");
});

canvas.addEventListener("touchmove", draw);

function sendDrawingData(x, y, type) {
  socket.emit("drawing", { x, y, type });
}

// Drawing based on data received from the server
socket.on("drawing", function (data) {
  drawFromSocket(data.x, data.y, data.type);
});

function drawOnCanvas(x, y, type) {
  if (type === "start") {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else if (type === "draw") {
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else if (type === "end") {
    ctx.beginPath();
  }
}

function drawFromSocket(x, y, type) {
  if (type === "start") {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else if (type === "draw") {
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else if (type === "end") {
    ctx.beginPath();
  }
}
