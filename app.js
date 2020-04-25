const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");

const INITIAL_COLOR = "#2d3436";
const CANVAS_SIZE = "700";

let filling = true;
/*캔버스의 크기를 지정해줘야 한다.*/
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

ctx.fillStyle = INITIAL_COLOR;

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX,
    y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  width = event.target.value;
  ctx.lineWidth = width;
}

function handleModeClick(event) {
  if (filling) {
    filling = false;
    mode.innerText = "Draw";
  } else {
    filling = true;
    mode.innerText = "Fill";
  }
}

function handleCanvasClick() {
  if (!filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZEr);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
