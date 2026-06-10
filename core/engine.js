const Engine = {

  dist(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  },

  moveToward(a, b) {
    if (a.x < b.x) a.x++;
    else if (a.x > b.x) a.x--;
    if (a.y < b.y) a.y++;
    else if (a.y > b.y) a.y--;
  },

  moveRandom(a) {
    const r = Math.floor(Math.random() * 4);
    if (r === 0) a.x++;
    if (r === 1) a.x--;
    if (r === 2) a.y++;
    if (r === 3) a.y--;
  },

  eatPlant(deer, world) {
    for (const id in world.plants) {
      const p = world.plants[id];

      if (this.dist(deer, p) < 2) {
        const bite = Math.min(1, p.biomass);
        p.biomass -= bite;
        deer.energy += bite * 3;
        return;
      }
    }
  },

  update(world) {

    // -------------------
    // PLANT GROWTH
    // -------------------
    for (const id in world.plants) {
      const p = world.plants[id];
      if (p.biomass < p.maxBiomass) {
        p.biomass += p.growthRate;
      }
    }

    const wolves = [];
    const deer = [];

    for (const id in world.entities) {
      const e = world.entities[id];
      if (e.type === "wolf") wolves.push(e);
      if (e.type === "deer") deer.push(e);
    }

    // -------------------
    // WOLVES
    // -------------------
    for (const w of wolves) {
      let target = null;
      let best = 999;

      for (const d of deer) {
        const dist = this.dist(w, d);
        if (dist < best) {
          best = dist;
          target = d;
        }
      }

      if (target) this.moveToward(w, target);
      else this.moveRandom(w);

      if (best < 2 && target) {
        target.energy -= 1;
        w.energy += 2;
      }

      w.energy -= w.genes.metabolism;
    }

    // -------------------
    // DEER
    // -------------------
    for (const d of deer) {

      this.eatPlant(d, world);

      const wolvesVisible = wolves.filter(w =>
        this.dist(d, w) <= d.genes.vision
      );

      let danger = null;
      let best = 999;

      for (const w of wolvesVisible) {
        const dist = this.dist(d, w);
        if (dist < best) {
          best = dist;
          danger = w;
        }
      }

      if (danger) {
        if (d.x < danger.x) d.x--;
        else if (d.x > danger.x) d.x++;

        if (d.y < danger.y) d.y--;
        else if (d.y > danger.y) d.y++;
      } else {
        this.moveRandom(d);
      }

      d.energy -= d.genes.metabolism;
    }

    world.removeDead();
  }
};

export { Engine };
