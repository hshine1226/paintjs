const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");
const clear = document.querySelector("#jsClear");
let previousTarget = null;

const INITIAL_COLOR = "#2d3436";
const CANVAS_SIZE = "700";

let filling = true;
/*캔버스의 크기를 지정해줘야 한다.*/
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

/*캔버스의 배경색 지정*/
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

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
  const currentTarget = event.target;
  if (previousTarget) {
    if (previousTarget !== currentTarget) {
      previousTarget.style.border = "none";
      currentTarget.style.border = "solid #ffa801 3px";
      previousTarget = currentTarget;
    }
  } else {
    currentTarget.style.border = "solid #ffa801 3px";
    previousTarget = currentTarget;
  }

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
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

/*우클릭 방지 기능*/
function handleCM(event) {
  console.log(event);
  event.preventDefault();
}

/*save 버튼을 클릭했을 때, 이미지를 저장하는 기능 
a 태크에 다운로드 링크를 만들고
fake click을 만들어서 이미지를 다운로드할 수 있다.*/
function handleSaveClick() {
  const fullQualityImage = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  link.download = "image.png";
  link.href = fullQualityImage;
  link.click();
}

function handleClearClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = previousTarget.style.backgroundColor;
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
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

if (save) {
  save.addEventListener("click", handleSaveClick);
}

if (clear) {
  clear.addEventListener("click", handleClearClick);
}
