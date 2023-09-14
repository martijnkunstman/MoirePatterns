class SeededRandom {
  constructor(seed = 0) {
    this.m = 0x80000000; // 2**31
    this.a = 1664525;
    this.c = 1013904223;
    this.seed = seed % this.m;
  }
  // Generate a number from 0 to 1
  nextFloat() {
    this.seed = (this.a * this.seed + this.c) % this.m;
    return this.seed / this.m;
  }
}

// Seed the generator
let seed = 123456; // Arbitrary seed value
const rng = new SeededRandom(seed);

// Generate an array of 10,000 seeded random numbers
let numbers = Array.from({ length: 10000 }, () => rng.nextFloat());

//square pattern
const staticCanvas1 = document.getElementById("staticCanvas1");
const rotatingCanvas1 = document.getElementById("rotatingCanvas1");
const staticCtx1 = staticCanvas1.getContext("2d");
const rotatingCtx1 = rotatingCanvas1.getContext("2d");

//triangle pattern
const staticCanvas2 = document.getElementById("staticCanvas2");
const rotatingCanvas2 = document.getElementById("rotatingCanvas2");
const staticCtx2 = staticCanvas2.getContext("2d");
const rotatingCtx2 = rotatingCanvas2.getContext("2d");

//random pattern
const staticCanvas3 = document.getElementById("staticCanvas3");
const rotatingCanvas3 = document.getElementById("rotatingCanvas3");
const staticCtx3 = staticCanvas3.getContext("2d");
const rotatingCtx3 = rotatingCanvas3.getContext("2d");

//random pattern scaled -> spiral
const staticCanvas4 = document.getElementById("staticCanvas4");
const rotatingCanvas4 = document.getElementById("rotatingCanvas4");
const staticCtx4 = staticCanvas4.getContext("2d");
const rotatingCtx4 = rotatingCanvas4.getContext("2d");

//lines rotated
const staticCanvas5 = document.getElementById("staticCanvas5");
const rotatingCanvas5 = document.getElementById("rotatingCanvas5");
const staticCtx5 = staticCanvas5.getContext("2d");
const rotatingCtx5 = rotatingCanvas5.getContext("2d");

//lines translated
const staticCanvas6 = document.getElementById("staticCanvas6");
const rotatingCanvas6 = document.getElementById("rotatingCanvas6");
const staticCtx6 = staticCanvas6.getContext("2d");
const rotatingCtx6 = rotatingCanvas6.getContext("2d");

//lines translated - 3 numbers
//const staticCanvas7 = document.getElementById("staticCanvas7");
const rotatingCanvas7 = document.getElementById("rotatingCanvas7");
//const staticCtx7 = staticCanvas7.getContext("2d");
const rotatingCtx7 = rotatingCanvas7.getContext("2d");

const width = 250;
const height = 250;

const squareSize = 5;
const triangleSize = 5;
const dotSize = 2;

function drawRandomPattern(ctx, offsetX = 0, offsetY = 0) {
  let counter = 0;
  for (let y = 0; y < height; y += dotSize / 2) {
    for (let x = 0; x < width; x += dotSize / 2) {
      if ((x + y) % (2 * dotSize) === 0) {
        ctx.fillStyle = "rgba(255,255,255,0)";
      } else {
        ctx.fillStyle = "black";
      }
      let xp = numbers[counter] * width;
      counter++;
      let yp = numbers[counter] * height;
      counter++;
      ctx.beginPath();
      ctx.arc(
        xp + offsetX + dotSize / 2,
        yp + offsetY + dotSize / 2,
        dotSize / 2,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }
}

function drawSquarePattern(ctx, offsetX = 0, offsetY = 0) {
  for (let y = 0; y < height; y += squareSize) {
    for (let x = 0; x < width; x += squareSize) {
      if ((x + y) % (2 * squareSize) === 0) {
        ctx.fillStyle = "rgba(255,255,255,0)";
      } else {
        ctx.fillStyle = "black";
      }
      ctx.fillRect(x + offsetX, y + offsetY, squareSize, squareSize);
    }
  }
}

function drawLinesPattern(ctx, offsetX = 0, offsetY = 0, zoom = 1) {
  for (let y = 0; y < height; y += squareSize * zoom) {
    for (let x = 0; x < width; x += squareSize * zoom) {
      if (y % (2 * squareSize * zoom) === 0) {
        ctx.fillStyle = "rgba(255,255,255,0)";
      } else {
        ctx.fillStyle = "black";
      }
      ctx.fillRect(
        x + offsetX,
        y + offsetY,
        squareSize * zoom,
        squareSize * zoom
      );
    }
  }
}

function drawTrianglesPattern(ctx, offsetX = 0, offsetY = 0) {
  for (let y = 0; y < height; y += squareSize) {
    for (let x = 0; x < width; x += squareSize) {
      const evenRow = Math.floor(y / squareSize) % 2 === 0;
      const evenCol = Math.floor(x / squareSize) % 2 === 0;
      const extra = (triangleSize / 2) * evenRow;
      // Upward facing triangle
      ctx.beginPath();
      ctx.moveTo(x + offsetX + extra, y + squareSize + offsetY);
      ctx.lineTo(x + squareSize + offsetX + extra, y + squareSize + offsetY);
      ctx.lineTo(x + squareSize / 2 + offsetX + extra, y + offsetY);

      // Determine fill color
      if (evenRow === evenCol) {
      } else {
        ctx.fillStyle = "black";
      }

      ctx.closePath();
      ctx.fill();
    }
  }
}

// Draw static chess pattern
drawSquarePattern(staticCtx1);
drawTrianglesPattern(staticCtx2);
drawRandomPattern(staticCtx3);
drawRandomPattern(staticCtx4);
drawLinesPattern(staticCtx5);
drawLinesPattern(staticCtx6);
//drawLinesPattern(staticCtx7);

let angle = 0;
let angle2 = 0;
let reset = 0;
let reset2 = 0;
function animate() {
  //1
  rotatingCtx1.clearRect(0, 0, width, height);
  rotatingCtx1.save();
  rotatingCtx1.translate(width / 2, height / 2);
  rotatingCtx1.rotate((angle * Math.PI) / 180);
  drawSquarePattern(rotatingCtx1, -width / 2, -height / 2);
  rotatingCtx1.restore();
  //2
  rotatingCtx2.clearRect(0, 0, width, height);
  rotatingCtx2.save();
  rotatingCtx2.translate(width / 2, height / 2);
  rotatingCtx2.rotate((angle * Math.PI) / 180);
  drawTrianglesPattern(rotatingCtx2, -width / 2, -height / 2);
  rotatingCtx2.restore();
  //3
  angle3 = -10 + (angle2 % 20);
  rotatingCtx3.clearRect(0, 0, width, height);
  rotatingCtx3.save();
  rotatingCtx3.translate(width / 2, height / 2);
  rotatingCtx3.rotate((angle3 * Math.PI) / 180);
  drawRandomPattern(rotatingCtx3, -width / 2, -height / 2);
  rotatingCtx3.restore();
  //4
  angle3 = -10 + (angle2 % 20);
  rotatingCtx4.clearRect(0, 0, width, height);
  rotatingCtx4.save();
  rotatingCtx4.translate(width / 2, height / 2);
  rotatingCtx4.scale(1.05, 1.05);
  rotatingCtx4.rotate((angle3 * Math.PI) / 180);
  drawRandomPattern(rotatingCtx4, -width / 2, -height / 2);
  rotatingCtx4.restore();
  //5
  rotatingCtx5.clearRect(0, 0, width, height);
  rotatingCtx5.save();
  rotatingCtx5.translate(width / 2, height / 2);
  rotatingCtx5.rotate((angle * Math.PI) / 180);
  drawLinesPattern(rotatingCtx5, -width / 2, -height / 2);
  rotatingCtx5.restore();
  //6
  rotatingCtx6.clearRect(0, 0, width, height);
  rotatingCtx6.save();
  rotatingCtx6.translate(width / 2, height / 2);
  //rotatingCtx6.scale(1, 1.2);
  //rotatingCtx6.rotate(0.1);
  drawLinesPattern(rotatingCtx6, -width / 2, -height / 2);
  rotatingCtx6.restore();
  rotatingCtx6.translate(0, 0.1);
  reset++;
  if (reset == 100) {
    reset = 0;
    rotatingCtx6.translate(0, -10);
    //rotatingCtx6.rotate(-10);
  }
  //7
  rotatingCtx7.clearRect(0, 0, width, height);
  rotatingCtx7.save();
  rotatingCtx7.translate(width / 2, height / 2);
  drawLinesPattern(rotatingCtx7, -width / 2, -height / 2, 2);
  rotatingCtx7.restore();
  rotatingCtx7.translate(0, 0.1);
  reset2++;
  if (reset2 == 200) {
    reset2 = 0;
    rotatingCtx7.translate(0, -20);
  }
  //
  //------------------
  //

  angle += 0.05;
  angle2 += 0.2;
  requestAnimationFrame(animate);
}
animate();
