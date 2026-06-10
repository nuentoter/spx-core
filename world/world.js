import {
  createWolf,
  createDeer,
  createPlant
}
from "../entities/registry.js";
export const World = {
  width: 40,
  height: 25,

  entities: {
    wolf_1: createWolf(5, 5),
    wolf_2: createWolf(8, 6),

    deer_1: createDeer(15, 10),
    deer_2: createDeer(20, 12),
    deer_3: createDeer(18, 14)
  }
    plants: {
  plant_1: createPlant(10, 10),
  plant_2: createPlant(15, 7),
  plant_3: createPlant(25, 14)
  },

  food: [],

  removeDead() {
    for (const id in this.entities) {
      if (this.entities[id].energy <= 0) {
        delete this.entities[id];
      }
    }
  }
};
