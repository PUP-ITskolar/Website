const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const streaks = [];
const MAX_STREAKS = 3; // restraint = calm

class Streak {
  constructor() {
    this.reset();
  }

  reset() {
    // Spawn offscreen top-right
    this.startX = canvas.width + Math.random() * 200;
    this.startY = -Math.random() * 200;

    // End roughly bottom-middle
    this.endX = canvas.width * 0.5 + (Math.random() - 0.5) * 200;
    this.endY = canvas.height + 200;

    this.progress = 0; // 0 → 1
    this.speed = 0.0005 + Math.random() * 0.0003;

    this.amplitude = 30 + Math.random() * 40;
    this.frequency = 2 + Math.random() * 2;
    this.phase = Math.random() * Math.PI * 2;

    this.opacity = 0;
    this.life = 0;
  }

  update() {
    this.progress += this.speed;
    this.life += 0.01;

    // Fade in / out
    if (this.progress < 0.2) {
      this.opacity = this.progress / 0.2;
    } else if (this.progress > 0.8) {
      this.opacity = (1 - this.progress) / 0.2;
    } else {
      this.opacity = 1;
    }

    if (this.progress >= 1) {
      this.reset();
    }
  }

  draw() {
  ctx.save();
  ctx.globalAlpha = this.opacity * 0.6;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#7fdcff");
  gradient.addColorStop(0.5, "#a0ffda");
  gradient.addColorStop(1, "#ffffff");

  ctx.strokeStyle = gradient;
  ctx.shadowColor = "#9eefff";
  ctx.shadowBlur = 15;

  ctx.beginPath();

  // Direction vector (travel direction)
  const dx = this.endX - this.startX;
  const dy = this.endY - this.startY;
  const length = Math.hypot(dx, dy);

  // Normal (perpendicular) vector
  const nx = -dy / length;
  const ny = dx / length;

  const steps = 80;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;

    // Move forward along the main path
    const px = this.startX + dx * (this.progress + t * 0.08);
    const py = this.startY + dy * (this.progress + t * 0.08);

    // Wave offset ONLY perpendicular to direction
    const wave =
      Math.sin(t * Math.PI * 2 * this.frequency + this.phase + this.life) *
      this.amplitude;

    const x = px + nx * wave;
    const y = py + ny * wave;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.stroke();
  ctx.restore();
}
}

// Initialize streaks
for (let i = 0; i < MAX_STREAKS; i++) {
  streaks.push(new Streak());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  streaks.forEach(streak => {
    streak.update();
    streak.draw();
  });

  requestAnimationFrame(animate);
}

animate();
