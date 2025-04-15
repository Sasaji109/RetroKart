const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamaño del mundo (mapa más grande que el canvas)
const world = {
  width: 2000,
  height: 2000
};

// Cargar imágenes
const fondoImg = new Image();
const cocheImg = new Image();
fondoImg.src = "images/map.png";
cocheImg.src = "images/coche.png";

// Jugador
const car = {
  x: world.width / 2,
  y: world.height / 2,
  width: 32,
  height: 16,
  speed: 3,
  dx: 0,
  dy: 0
};

// Cámara
const camera = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height
};

function updateCamera() {
  camera.x = car.x + car.width / 2 - camera.width / 2;
  camera.y = car.y + car.height / 2 - camera.height / 2;

  // Límites de cámara
  if (camera.x < 0) camera.x = 0;
  if (camera.y < 0) camera.y = 0;
  if (camera.x + camera.width > world.width) camera.x = world.width - camera.width;
  if (camera.y + camera.height > world.height) camera.y = world.height - camera.height;
}

function drawBackground() {
  ctx.drawImage(
    fondoImg,
    camera.x, camera.y, camera.width, camera.height, // fuente
    0, 0, canvas.width, canvas.height                // destino
  );
}

function drawCar() {
  const drawX = car.x - camera.x;
  const drawY = car.y - camera.y;
  ctx.drawImage(cocheImg, drawX, drawY, car.width, car.height);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  car.x += car.dx;
  car.y += car.dy;

  // límites del mundo
  if (car.x < 0) car.x = 0;
  if (car.y < 0) car.y = 0;
  if (car.x + car.width > world.width) car.x = world.width - car.width;
  if (car.y + car.height > world.height) car.y = world.height - car.height;

  updateCamera();
}

function loop() {
  clear();
  drawBackground();
  update();
  drawCar();
  requestAnimationFrame(loop);
}

// Controles teclado
function keyDown(e) {
  if (e.key === "ArrowRight") car.dx = car.speed;
  if (e.key === "ArrowLeft") car.dx = -car.speed;
  if (e.key === "ArrowUp") car.dy = -car.speed;
  if (e.key === "ArrowDown") car.dy = car.speed;
}

function keyUp(e) {
  if (["ArrowRight", "ArrowLeft"].includes(e.key)) car.dx = 0;
  if (["ArrowUp", "ArrowDown"].includes(e.key)) car.dy = 0;
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Botones móviles
const btnUp = document.getElementById("up");
const btnDown = document.getElementById("down");
const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");

function setDir(dx, dy) {
  car.dx = dx * car.speed;
  car.dy = dy * car.speed;
}

function stopDir(axis) {
  if (axis === 'x') car.dx = 0;
  if (axis === 'y') car.dy = 0;
}

btnUp.addEventListener("touchstart", () => setDir(0, -1));
btnDown.addEventListener("touchstart", () => setDir(0, 1));
btnLeft.addEventListener("touchstart", () => setDir(-1, 0));
btnRight.addEventListener("touchstart", () => setDir(1, 0));

btnUp.addEventListener("touchend", () => stopDir('y'));
btnDown.addEventListener("touchend", () => stopDir('y'));
btnLeft.addEventListener("touchend", () => stopDir('x'));
btnRight.addEventListener("touchend", () => stopDir('x'));

// Cargar imágenes antes de empezar
let imagesLoaded = 0;
[fondoImg, cocheImg].forEach(img => {
  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) loop(); // Comenzar solo cuando ambas imágenes estén listas
  };
});