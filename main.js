const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const car = {
  x: 200,
  y: 150,
  width: 32,
  height: 16,
  color: "cyan",
  speed: 2,
  dx: 0,
  dy: 0
};

function drawCar() {
  ctx.fillStyle = car.color;
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  car.x += car.dx;
  car.y += car.dy;

  // Límites de pantalla
  if (car.x < 0) car.x = 0;
  if (car.y < 0) car.y = 0;
  if (car.x + car.width > canvas.width) car.x = canvas.width - car.width;
  if (car.y + car.height > canvas.height) car.y = canvas.height - car.height;
}

function loop() {
  clear();
  update();
  drawCar();
  requestAnimationFrame(loop);
}

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

// Controles táctiles con botones
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

loop();