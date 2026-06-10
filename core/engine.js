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

  getVisible(entity, list) {
    return list.filter(t =>
      this.dist(entity, t) <= entity.genes.vision
    );
  },

  update(world) {

    if (world.food.length < 120 && Math.random() < 0.3) {
      world.food.push({
        x: (Math.random() * world.width) | 0,
        y: (Math.random() * world.height) | 0
      });
    }

    const wolves = [];
    const deer = [];

    for (const id in world.entities) {
      const e = world.entities[id];
      if (e.type === "wolf") wolves.push(e);
      if (e.type === "deer") deer.push(e);
    }

    // wolves
    for (const w of wolves) {

      const visible = this.getVisible(w, deer);

      let target = null;

      for (const d of visible) {
        if (!target || this.dist(w, d) < this.dist(w, target)) {
          target = d;
        }
      }

      if (target) this.moveToward(w, target);
      else this.moveRandom(w);

      w.energy -= w.genes.metabolism;
    }

    // deer
    for (const d of deer) {

      const visible = this.getVisible(d, wolves);

      let danger = null;

      for (const w of visible) {
        if (!danger || this.dist(d, w) < this.dist(d, danger)) {
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
