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

const staticCanvas1 = document.getElementById("staticCanvas1");
const rotatingCanvas1 = document.getElementById("rotatingCanvas1");
const staticCtx1 = staticCanvas1.getContext("2d");
const rotatingCtx1 = rotatingCanvas1.getContext("2d");

const staticCanvas2 = document.getElementById("staticCanvas2");
const rotatingCanvas2 = document.getElementById("rotatingCanvas2");
const staticCtx2 = staticCanvas2.getContext("2d");
const rotatingCtx2 = rotatingCanvas2.getContext("2d");

const staticCanvas3 = document.getElementById("staticCanvas3");
const rotatingCanvas3 = document.getElementById("rotatingCanvas3");
const staticCtx3 = staticCanvas3.getContext("2d");
const rotatingCtx3 = rotatingCanvas3.getContext("2d");

const staticCanvas4 = document.getElementById("staticCanvas4");
const rotatingCanvas4 = document.getElementById("rotatingCanvas4");
const staticCtx4 = staticCanvas4.getContext("2d");
const rotatingCtx4 = rotatingCanvas4.getContext("2d");

const width = 250;
const height = 250;

const squareSize = 5;
const triangleSize = 5;
const dotSize = 2;



function drawRandomPattern(ctx, offsetX = 0, offsetY = 0) {
  let counter = 0;
  for (let y = 0; y < height; y += dotSize/2) {
    for (let x = 0; x < width; x += dotSize/2) {
      if ((x + y) % (2 * dotSize) === 0) {
        ctx.fillStyle = "rgba(255,255,255,0)";
      } else {
        ctx.fillStyle = "black";
      }
      let xp = numbers[counter]*width;
      counter++;
      let yp = numbers[counter]*height;
      counter++;
      ctx.beginPath();
ctx.arc(xp + offsetX + dotSize/2, yp + offsetY + dotSize/2, dotSize/2, 0, 2 * Math.PI);
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

function drawTrianglesPattern(ctx, offsetX = 0, offsetY = 0) {
    for (let y = 0; y < height; y += squareSize) {
        for (let x = 0; x < width; x += squareSize) {
            const evenRow = Math.floor(y / squareSize) % 2 === 0;
            const evenCol = Math.floor(x / squareSize) % 2 === 0;
            const extra = triangleSize/2 * evenRow;
            // Upward facing triangle
            ctx.beginPath();
            ctx.moveTo(x + offsetX + extra, y + squareSize + offsetY);
            ctx.lineTo(x + squareSize + offsetX +extra, y + squareSize + offsetY);
            ctx.lineTo(x + squareSize / 2 + offsetX +extra, y + offsetY);
            
            // Determine fill color
            if (evenRow === evenCol) {
             } else {
                ctx.fillStyle = 'black';
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

let angle = 0;
let angle2= 0;
function animate() {
  //1
  rotatingCtx1.clearRect(0, 0, width, height);
  rotatingCtx1.save();
  rotatingCtx1.translate(width / 2, height / 2);
  rotatingCtx1.rotate((angle * Math.PI) / 180);
  drawSquarePattern(
    rotatingCtx1,
    -width/2,
    -height/2
  );
  rotatingCtx1.restore();
  //2
  rotatingCtx2.clearRect(0, 0, width, height);
  rotatingCtx2.save();
  rotatingCtx2.translate(width / 2, height / 2);
  rotatingCtx2.rotate((angle * Math.PI) / 180);
  drawTrianglesPattern(
    rotatingCtx2,
    -width/2,
    -height/2
  );
  rotatingCtx2.restore();
  //3
  angle3 = -10 + angle2 % 20;
  
  rotatingCtx3.clearRect(0, 0, width, height);
  rotatingCtx3.save();
  rotatingCtx3.translate(width / 2, height / 2);
  rotatingCtx3.rotate((angle3 * Math.PI) / 180);
  drawRandomPattern(
    rotatingCtx3,
    -width/2,
    -height/2
  );
  rotatingCtx3.restore();
   //4
  angle3 = -10 + angle2 % 20;
  
  rotatingCtx4.clearRect(0, 0, width, height);
  rotatingCtx4.save();
  rotatingCtx4.translate(width / 2, height / 2);
  rotatingCtx4.scale(1.05,1.05);
  rotatingCtx4.rotate((angle3 * Math.PI) / 180);
  drawRandomPattern(
    rotatingCtx4,
    -width/2,
    -height/2
  );
  rotatingCtx4.restore();
  //  
  angle += 0.05;
  angle2 +=0.2;
  requestAnimationFrame(animate);
 
}
animate();