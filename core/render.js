const SIZE = 20;

const Render = {

  draw(world) {

    const ctx = window.ctx;
    const Camera = window.Camera;

    ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);

    ctx.save();
    ctx.scale(Camera.zoom, Camera.zoom);
    ctx.translate(-Camera.x, -Camera.y);

    // terrain
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

    // plants (biomass visualization)
    for (const id in world.plants) {
      const p = world.plants[id];

      const intensity = Math.min(255, p.biomass * 25);
      ctx.fillStyle = `rgb(60, ${120 + intensity / 3}, 60)`;

      ctx.beginPath();
      ctx.arc(
        p.x * SIZE,
        p.y * SIZE,
        2 + p.biomass * 0.7,
        0,
        Math.PI * 2
      );
      ctx.fill();
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

    // HUD (population pressure visibility)
    document.getElementById("hud").innerText =
`Tick: ${world.tick}
Wolves: ${Object.values(world.entities).filter(e => e.type === "wolf").length}
Deer: ${Object.values(world.entities).filter(e => e.type === "deer").length}
Plants: ${Object.keys(world.plants).length}`;
  }
};

export { Render };
