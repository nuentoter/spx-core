import { World } from "./world/world.js";
import { Engine } from "./core/engine.js";
import { Render } from "./core/render.js";
import { Camera } from "./core/camera.js";

// =======================
// SETUP
// =======================

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// expose globally for modules that need it
window.canvas = canvas;
window.ctx = ctx;
window.Camera = Camera;

// =======================
// INPUT (PAN + ZOOM)
// =======================

let pointers = new Map();
let lastDist = null;

canvas.addEventListener("pointerdown", (e) => {
  canvas.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
});

canvas.addEventListener("pointerup", (e) => {
  pointers.delete(e.pointerId);
  lastDist = null;
});

canvas.addEventListener("pointermove", (e) => {
  if (!pointers.has(e.pointerId)) return;

  const prev = pointers.get(e.pointerId);
  const curr = { x: e.clientX, y: e.clientY };
  pointers.set(e.pointerId, curr);

  const arr = [...pointers.values()];

  if (arr.length === 1) {
    Camera.x -= (curr.x - prev.x) / Camera.zoom;
    Camera.y -= (curr.y - prev.y) / Camera.zoom;
  }

  if (arr.length === 2) {
    const d = Math.hypot(
      arr[0].x - arr[1].x,
      arr[0].y - arr[1].y
    );

    if (lastDist != null) {
      Camera.zoom *= (1 + (d - lastDist) * 0.005);
      Camera.zoom = Math.max(0.4, Math.min(5, Camera.zoom));
    }

    lastDist = d;
  }
});

// =======================
// LOOP
// =======================

let last = 0;
let acc = 0;
const STEP = 1000 / 8;

function loop(t) {
  if (!last) last = t;

  const dt = t - last;
  last = t;

  acc += dt;

  while (acc >= STEP) {
    Engine.update(World);
    acc -= STEP;
  }

  Render.draw(World);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
