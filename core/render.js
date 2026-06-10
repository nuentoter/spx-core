const SIZE = 20;

const Render = {

  draw(world) {

    const ctx = window.ctx;
    const Camera = window.Camera;

    ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

    ctx.save();
    ctx.scale(Camera.zoom, Camera.zoom);
    ctx.translate(-Camera.x, -Camera.y);

    // grid
    for (let x = 0; x < world.width; x++) {
      for (let y = 0; y < world.height; y++) {

        const edge =
          x === 0 || y === 0 ||
          x === world.width - 1 ||
          y === world.height - 1;

        ctx.fillStyle = edge ? "#0b2a3a" : "#0f3d2e";
        ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
      }
    }

    // entities
    for (const id in world.entities) {
      const e = world.entities[id];

      ctx.fillStyle = e.type === "wolf" ? "#ff3b3b" : "#44ff44";
      ctx.beginPath();
      ctx.arc(e.x * SIZE, e.y * SIZE, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    document.getElementById("hud").innerText =
      `Entities: ${Object.keys(world.entities).length}`;
  }
};

export { Render };
